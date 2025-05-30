import { Injectable, Inject} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { API_URL } from '../app.config';

interface NewTokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<NewTokenPair | null>(null);

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient, 
    @Inject(API_URL) private url: string
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorage.getAccessToken();
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401(authReq, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshSubject.next(null);

      const refreshToken = this.localStorage.getRefreshToken();
      if (!refreshToken) {
        return throwError(() => new Error('No refresh token'));
      }

      return this.httpRefresh(refreshToken).pipe(
        switchMap(tokens => {
          this.isRefreshing = false;
          this.localStorage.setAccessToken(tokens.accessToken);
          this.localStorage.setRefreshToken(tokens.refreshToken);
          this.refreshSubject.next(tokens);

          return next.handle(
            req.clone({ setHeaders: { Authorization: `Bearer ${tokens.accessToken}` } })
          );
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.localStorage.clearAll();
          return throwError(() => err);
        })
      );
    }

    return this.refreshSubject.pipe(
      filter(tokens => tokens !== null),
      take(1),
      switchMap(tokens => {
        return next.handle(
          req.clone({ setHeaders: { Authorization: `Bearer ${tokens!.accessToken}` } })
        );
      })
    );
  }

  private httpRefresh(refreshToken: string): Observable<NewTokenPair> {
    return this.http
      .get<NewTokenPair>(`${this.url}/security/updateAccessToken?refreshToken=${refreshToken}`);
  }
}
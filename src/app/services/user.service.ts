import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable, of } from 'rxjs';

export interface EmailCheck {
  exists: boolean;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken?: string;
  name?: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }

  /**
   * Перевірка, чи існує email у базі.
   * TODO: Розкоментуйте й вкажіть свій endpoint, коли backend готовий.
   */
  checkEmail(email: string): Observable<EmailCheck> {
    // const url = `${this.apiUrl}/users/check-email?email=${encodeURIComponent(email)}`;
    // return this.http.get<EmailCheck>(url);

    // Заглушка: завжди повертає, що email вільний
    return of({ exists: false });
  }

  signup(data: SignUpData): Observable<any> {
    const url = `${this.apiUrl}/security/signUp`;
    return this.http.post<any>(url, data);
  }

  signin(data: SignInData): Observable<SignInResponse> {
    const url = `${this.apiUrl}/security/signIn`;
    return this.http.post<SignInResponse>(url, data);
  }

  getProfile(): Observable<any> {
    const url = `${this.apiUrl}/security/profile`;
    return this.http.get<any>(url);
  }

  checkToken(): Observable<any> {
    const url = `${this.apiUrl}/security/check-token`;
    return this.http.get<any>(url);
  }
}

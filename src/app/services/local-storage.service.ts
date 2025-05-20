import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly ACCESS_TOKEN_KEY = 'access-token';
  private readonly REFRESH_TOKEN_KEY = 'refresh-token';
  private readonly USER_ID_KEY = 'user-id';
  private readonly FIRST_NAME_KEY = 'first-name';


  setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setUserId(id: number): void {
    localStorage.setItem(this.USER_ID_KEY, id.toString());
  }
  getUserId(): number | null {
    const v = localStorage.getItem(this.USER_ID_KEY);
    return v ? parseInt(v, 10) : null;
  }
  setFirstName(name: string): void {
    localStorage.setItem(this.FIRST_NAME_KEY, name);
  }
  getFirstName(): string | null {
    return localStorage.getItem(this.FIRST_NAME_KEY);
  }


  clearAll(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.FIRST_NAME_KEY);
  }
}
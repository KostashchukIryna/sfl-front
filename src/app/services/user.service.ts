import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  getProfile() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL) private url: string
  ) { }

  signup(data: any) {
    return this.httpClient.post(this.url +
      "security/signUp", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  signin(data: any) {
    return this.httpClient.post(this.url +
      "security/signIn", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  checkToken() {
    return this.httpClient.get(this.url)
  }
}

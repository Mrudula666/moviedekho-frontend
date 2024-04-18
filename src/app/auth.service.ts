import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('/api/user/authenticate', { email, password });
  }

  register(user: any) {
    return this.http.post('/api/user/register', user);
  }
}

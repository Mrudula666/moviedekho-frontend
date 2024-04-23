import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';

  // Store the token
  setToken(token: string): void {
    this.token = token;
  }

  // Retrieve the token
  getToken(): string {
    console.log(this.token);
    return this.token;
  }


}

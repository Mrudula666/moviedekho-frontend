import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginResponse } from '../../models/LoginResponse.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule], // Add HttpClientModule
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private router: Router, 
    private fb: FormBuilder, 
    private http: HttpClient,
    private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.http
  .post<LoginResponse>('http://localhost:8081/api/auth/login', { userName: username, password })
  .subscribe(
    (response: LoginResponse) => { 
      const token= response.token;
      this.authService.setToken(token);
      console.log('Login successful:', response);
      if (response && Array.isArray(response.roleNames)) {
        if (response.roleNames.includes('ROLE_USER')) { 
          console.log('In Role_user ::: ', response.roleNames);
          this.router.navigateByUrl('/user-dashboard');
        } else if (response.roleNames.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin-dashboard']); 
        }
      }
    },
    (error) => console.error('Login failed:', error) 
  );

    }
  }
}

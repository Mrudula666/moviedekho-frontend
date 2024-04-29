import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../_services/api.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private router: Router, 
    private fb: FormBuilder, 
    private http: HttpClient,
    private authService: AuthService, 
    private apiService: ApiService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], 
      password: ['', [Validators.required,
         Validators.minLength(6)]]
         
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.http.post(this.apiService.login(), { userName: username, password }).subscribe({
        next:(res:any) =>{
          const token= res.token;
          sessionStorage.setItem('userDetails', JSON.stringify(res));
          sessionStorage.setItem('token', token);
     
      console.log('Login successful:', res);
      sessionStorage.setItem('userLogin', 'true');
      if (res && Array.isArray(res.roleNames)) {
        if (res.roleNames.includes('ROLE_USER')) { 
          console.log('In Role_user ::: ', res.roleNames);
          this.router.navigateByUrl('/user-dashboard');
        } else if (res.roleNames.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin-dashboard']); 
        }
      }
        },
        error(err) {
          console.error('Login failed:', err);
        },
      })
    }
  }

}

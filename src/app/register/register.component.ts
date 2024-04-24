import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RegisterResponse } from '../../models/RegisterResponse.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup; // Reactive form group

  constructor( private router:Router,
    private fb: FormBuilder,
    private http: HttpClient // Inject HttpClient
  ) { 
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      username: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      roleName: ['ROLE_USER', Validators.required], 
      gender: ['MALE', Validators.required],
      subscriptionPlan: ['', Validators.required],
      dateOfBirth: ['', Validators.required], 
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)], // Mobile number validation
      ],
      country: ['', Validators.required], 
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value; 
      this.http
        .post<RegisterResponse>('http://localhost:8081/api/auth/register', formData) 
        .subscribe(
          (response: RegisterResponse) => {
            console.log('Registration successful:', response);
            this.router.navigate(['/login']);
          },
          (error: any) => { 
            console.error('Registration failed:', error); 
          }
        );
    } else {
      console.error('Form is not valid'); 
    }
  }
}

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

declare var Razorpay:any;

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
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]], // Alphanumeric usernames
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('(?=.*[A-Z])(?=.*[!@#$&*]).+')
      ]],
      confirmPassword: ['', [Validators.required]],
      roleName: ['ROLE_USER', Validators.required], 
      gender: ['MALE', Validators.required],
      subscriptionPlan: ['', Validators.required],
      dateOfBirth: ['', Validators.required], 
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')] // Assuming a 10-digit mobile number
      ],
      country: ['', Validators.required], 
    }, { 
      validators: this.passwordMatchValidator // Custom validator for password matching
    });
    
  }

  private passwordMatchValidator(formGroup: FormGroup): { [key: string]: any } | null {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value 
      ? null : { 'mismatch': true };
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value; 
      this.http
        .post('http://localhost:8081/api/auth/register', formData) 
        .subscribe(
          (response: any) => {
            console.log('Registration successful:', response);
            if(response.roleNames.includes('ROLE_USER')){
              let subscriptionAmount = 0;
              if (response.subscriptionPlan === "PREMIUM") {
                subscriptionAmount = 100000; 
              } else if (response.subscriptionPlan === "BASIC") {
                subscriptionAmount = 50000; 
              }
                    const RozarpayOptions = {
                      description: 'Movie Subscription',
                      currency: 'INR',
                      amount: subscriptionAmount,
                      name: response.username,
                      key: 'rzp_test_FyLWRs08iJjnh7',
                      image: 'https://i.imgur.com/FApqk3D.jpeg',
                      prefill: {
                        name: response.username,
                        email: response.email,
                        phone: response.mobileNumber
                      },
                      theme: {
                        color: '#6466e3'
                      },
                      modal: {
                        ondismiss:  () => {
                          console.log('dismissed')
                        }
                      }
                    }
                
                    const successCallback = (paymentid: any) => {
                      console.log(paymentid);
                    }
                
                    const failureCallback = (e: any) => {
                      console.log(e);
                    }
                
                    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
                  }
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

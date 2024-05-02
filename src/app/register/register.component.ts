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
import { ApiService } from '../_services/api.service';
import { error } from 'console';

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
export class RegisterComponent {
  registerForm: FormGroup; // Reactive form group


  constructor( private router:Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService
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
      roleName: ['ROLE_USER'], 
      gender: ['MALE'],
      subscriptionPlan: ['NONE'],
      dateOfBirth: ['', Validators.required], 
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')] // Assuming a 10-digit mobile number
      ],
      country: ['', Validators.required], 
    })
    
  }

  email: any = "";
  username:string = "";
  password:any = "";
  confirmpassword:any = "";
  roleName: any ="USER";
  gender: any ="MALE";
  dateOfBirth: any ="";
  mobileNumber: any = "";
  country: any = "";
  subscriptionPlan: any = "NONE";
  emailError:boolean = false;
  userNameError:boolean = false;
  passwordError:boolean = false;
  passwordPatternError:boolean = false;
  confirmPasswordError:boolean = false;

  onSubmit() {

    console.log(this.password.length > 4 ,
      "2", !this.password.includes(" ") ,"3", 
      /\d/.test(this.password) ,"4",  
      this.password.toUpperCase() !== this.password ,"5",
      this.password.toLowerCase() !== this.password)

      
    if(this.username == ""){
      this.userNameError = true;
    }
    if(this.password.length == 0){
      this.passwordError = true;
    }
    if(this.password.length <= 4 || this.password.includes(" ") ||! /\d/.test(this.password) ||  this.password.toUpperCase() == this.password || this.password.toLowerCase() == this.password){
      this.passwordPatternError = true;
    }
    if(this.confirmpassword !== this.password){
      this.confirmPasswordError = true;
    }

    if(!this.userNameError && !this.passwordError && !this.passwordPatternError && !this.confirmPasswordError){

      const formData = this.registerForm.value; 
      this.userNameError = false;
      this.passwordError = false;
      this.passwordPatternError = false;
      this.confirmPasswordError = false;
      const password = this.password
/* 
      if(this.subscriptionPlan !== "NONE" && this.roleName.includes('ROLE_USER')){
        if(this.roleName.includes('ROLE_USER')){
          let subscriptionAmount = 0;
          if (this.subscriptionPlan === "PREMIUM") {
            subscriptionAmount = 100000; 
          } else if (this.subscriptionPlan === "BASIC") {
            subscriptionAmount = 50000; 
          }

          const RozarpayOptions = {
            description: 'Movie Subscription',
            currency: 'INR',
            amount: subscriptionAmount,
            name: this.username,
            key: 'rzp_test_FyLWRs08iJjnh7',
            image: 'https://i.imgur.com/FApqk3D.jpeg',
            prefill: {
              name: this.username,
              email: this.email,
              phone: this.mobileNumber
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
        
      } */

      this.http.post(this.apiService.register(), { 
        email: this.email, 
        username: this.username, 
        password, 
        roleName: this.roleName,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
        mobileNumber: this.mobileNumber,
        country: this.country,
        subscriptionPlan:this.subscriptionPlan}).subscribe({
          next:(res:any) => {
            console.log('Registration successful:', res);
            this.router.navigate(['/login']);

          }, error(err){
            console.log("Registration Failed")
          }

        })

      
    
  }
}
}

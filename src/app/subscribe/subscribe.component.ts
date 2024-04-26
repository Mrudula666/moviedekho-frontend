
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../_services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

declare var Razorpay:any;
@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent implements OnInit{


  userForm: FormGroup;
  subscriptionTypes = ['NONE', 'BASIC', 'PREMIUM'];
  selectedSubscription = 'NONE';
  user = JSON.parse(sessionStorage.getItem('userDetails'));
  email: any = this.user.email;
  dob:any = this.user.dob;


  constructor(
    private fb: FormBuilder,
   // private paymentService: RazorPayServiceComponent, 
    private apiService: ApiService,
    private http:HttpClient
  ) {
    this.userForm = this.fb.group({
      email: [this.user.email],
      mobile: [this.user.mobileNumber],
      dob: [this.user.dateOfBirth],
      gender: [this.user.gender],
      country: [this.user.country],
      username: [this.user.username],
      subscriptionPlan: ['NONE'],
    });
  }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      email: [this.user.email],
      mobile: [this.user.mobileNumber],
      dob: [this.user.dateOfBirth],
      gender: [this.user.gender],
      country: [this.user.country],
      username: [this.user.username],
      subscriptionPlan: ['NONE'],
    });
    
  }

  onUpdateSubscription() {
    const formData = this.userForm.value;
    console.log(formData);
    const body = formData;
    this.http.patch(this.apiService.updateSubscribe(),body).subscribe({
      next:(res:any) => {
        console.log("Updated Subscription", res);

        if(res.roleNames.includes(res.ROLE_USER)){
  let subscriptionAmount = 0;
  if (res.subscriptionPlan === "PREMIUM") {
    subscriptionAmount = 100000; 
  } else if (res.subscriptionPlan === "BASIC") {
    subscriptionAmount = 50000; 
  }
        const RozarpayOptions = {
          description: 'Movie Subscription',
          currency: 'INR',
          amount: subscriptionAmount,
          name: res.username,
          key: 'rzp_test_FyLWRs08iJjnh7',
          image: 'https://i.imgur.com/FApqk3D.jpeg',
          prefill: {
            name: res.username,
            email: res.email,
            phone: res.mobileNumber
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

      }})
      
    }
    
  }
  
  

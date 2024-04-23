import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/api.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,CommonModule, HttpClientModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  movies: any[] = []; 
  //token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtcnVkdWxhNjY4NiIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzEzODUxNzc4LCJleHAiOjE3MTM4NjI1Nzh9.CA1M5NKG3hqM_-OHTfCu8C2BH2JUasSs6BXR13IKfikiEGPtuFEYHkkm8ekC-NUVpq04bL6417kyQvVm6gSUaQ`;
  
  userLoggedIn: boolean = false;
  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
   
    sessionStorage.setItem('test','test');
  
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`).set('Content-Type', 'application/json');
    this.http.get(this.apiService.getAllMovies()).subscribe({
      next:(res:any) =>{
        console.log(res)
        this.movies = res;  
      },
      error(err) {
        console.error("Error.....")
      },
    });
   
  }


}

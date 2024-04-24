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

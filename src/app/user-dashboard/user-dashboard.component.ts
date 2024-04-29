import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../_services/api.service';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit, AfterViewInit{
[x: string]: any;

movies: any[] = []; 
selectedMovie: Movie | null = null; 

dashboardData: any;
filteredMovies: any;
modelData: Movie | null = null;
searchGenre: string = '';
searchTitle: string = '';
searchActors: string = '';
searchRating: number | null = null;
searchYear: number | null = null;
movie: any;
targetedMovie: any;
errormsg: any;

  constructor(private route: Router,private http: HttpClient,private apiService: ApiService, private authService: AuthService) {}
  ngAfterViewInit(): void {
    
  }


  ngOnInit(): void {
    this.searchMovies();
    this.getAllMovies();
  }
   token = sessionStorage.getItem('token');
  getAllMovies(): any{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`).set('Content-Type', 'application/json');
    this.http.get(this.apiService.getAllMovies(), {headers}).subscribe({
      next:(res:any) =>{
        console.log(res)
        this.movies = res;  
        
      },
      error(err) {
        console.error("Error.....")
      },
    });
  }

  searchMovies(): any {
    // Define query parameters
    const queryParams = {
      title: this.searchTitle,
      genre: this.searchGenre,
      actors: this.searchActors,
      minRating: this.searchRating,
      releaseYear: this.searchYear,
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`).set('Content-Type', 'application/json');
    this.http.get(this.apiService.searchMovies(queryParams), {headers}).subscribe({
      next:(res:any) => {
        console.log(res)
        this.movies = res; 
      }
    })
  }

  getModalData(data: Movie): void {
    this.modelData = data; 
  }

  playMovie(title: any) {
    if (sessionStorage.getItem('userLogin')) {
    
      let a= this.movies.filter((data:any)=> {return data.title == title});
      this.targetedMovie = a[0];
      this.route.navigate(['watch-movie'], {
        state: this.targetedMovie
      });

    } else{
     //this.errormsg = 'you have to login';
      this.route.navigate(['/login']);
    }
  
  }
 
  }

  


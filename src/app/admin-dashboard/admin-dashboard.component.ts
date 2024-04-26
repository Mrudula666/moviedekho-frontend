import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie.model';
import { ApiService } from '../_services/api.service';
import * as bootstrap from 'bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
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

constructor(private router: Router,private http: HttpClient,private apiService: ApiService, private authService: AuthService) {}
  token = this.authService.getToken();


  ngOnInit(): void {
    this.getAllMovies();
   //this.openAddMovieForm();
   this.deleteMovie(this.movie.title);
  }

  

  deleteMovie(title: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.delete(this.apiService.deleteMovie(title), { headers }).subscribe({
      next:(res:any) => {
        console.log("Movie Deleted");
      }
    })

  }

  
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
  getModalData(data: Movie): void {
    this.modelData = data; 
  }

 

    updateMovieDetails(movie: any): void {
      
      this.router.navigate(['/update-movie-form'], {
        queryParams: {
          title: movie.title,
          actors: movie.actors, 
          genre: movie.genre,
          yearOfRelease: movie.yearOfRelease,
          rating: movie.rating,
          streamLink: movie.streamLink,
          moviePoster: movie.moviePoster,
        },
      });
    }

    openAddMovieForm() {
      this.router.navigate(['/add-movie-form']);
      }
}

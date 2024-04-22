import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
[x: string]: any;

dashboardData: any;
filteredMovies: any;
modelData: Movie | null = null;
searchGenre: string = '';
searchTitle: string = '';
searchActors: string = '';
searchRating: number | null = null;
searchYear: number | null = null;

  constructor(private movieService: MovieService, private authService: AuthService) {}

  ngOnInit(): void {
    this.searchMovies();
  }

  searchMovies(): void {
    // Define query parameters
    const queryParams = {
      title: this.searchTitle,
      genre: this.searchGenre,
      actors: this.searchActors,
      minRating: this.searchRating,
      releaseYear: this.searchYear,
    };

    // Sample token for authentication (replace with your logic)
    const token = this.authService.getToken();

     // Call searchMovies from MovieService
     this.movieService.searchMovies(queryParams, token).subscribe((data) => {
      this.dashboardData = data;
      this.filteredMovies = data;
    });
  }

  getModalData(data: Movie): void {
    this.modelData = data; 
  }
  }


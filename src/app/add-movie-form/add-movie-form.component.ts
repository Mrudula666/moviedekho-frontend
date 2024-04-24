
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovieResponse } from '../../models/MovieResponse.model';

@Component({
  selector: 'app-add-movie-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css'
})
export class AddMovieFormComponent  implements OnInit{
  
  movie: any;
  addMovieForm: any;

constructor( private router:Router,
  private fb: FormBuilder,
  private http: HttpClient,
  private authService: AuthService
) { 
  this.addMovieForm = this.fb.group({
    title: ['', Validators.required],
    actors: ['', Validators.required],
    yearOfRelease: ['', Validators.required],
    rating:['',Validators.required],
    genre: ['', Validators.required],
    streamLink: ['', Validators.required],
    moviePoster: ['', Validators.required],
  });
}
  
  ngOnInit(): void {
   
  }
    token = this.authService.getToken();

    onSubmit() {
      if (this.addMovieForm.valid) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`).set('Content-Type', 'application/json');
        const formData = this.addMovieForm.value; 
        this.http
          .post<MovieResponse>('http://localhost:8082/api/movie/addMovieDetails', formData) 
          .subscribe(
            (response: any) => {
              console.log('Registration successful:', response);
              this.router.navigate(['/admin-dashboard'])
            },
            (error: any) => { 
              console.error('Add Movie failed:', error); 
            }
          );
      } else {
        console.error('Form is not valid'); 
      }
    }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-update-movie',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  templateUrl: './update-movie.component.html',
  styleUrl: './update-movie.component.css'
})
export class UpdateMovieComponent implements OnInit{

  movie: any;
  updateMovieForm: any;
  queryParams:any;

constructor( private router:Router,
  private fb: FormBuilder,
  private http: HttpClient,
  private route:Router,
  private authService: AuthService
) { 
  this.updateMovieForm = this.fb.group({
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

  if (this.updateMovieForm.valid) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`).set('Content-Type', 'application/json');
    const formData = this.updateMovieForm.value; 
    this.http
      .put<MovieResponse>('http://localhost:8082/api/movie/updateMovieDetails', formData) 
      .subscribe(
        (response: any) => {
          console.log('Update successful:', response);
          this.router.navigate(['/admin-dashboard'])
        },
        (error: any) => { 
          console.error('Update Movie failed:', error); 
        }
      );
  } else {
    console.error('Form is not valid'); 
  }
  
  }


}

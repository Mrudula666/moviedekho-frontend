import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  title:any;
  actors:any;
  streamingLink:any;
  posterLink:any;
  director:any;
  plot:any;

  deleteMovie() {

  }
  movie: any;
  addOrUpdateMovie() :any {
    
  }

}

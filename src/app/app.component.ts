import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponentComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true
})
export class AppComponent implements OnInit{
  title = 'movie-service-app';
  constructor() { }

  ngOnInit() {
  }
}

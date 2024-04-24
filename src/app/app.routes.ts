import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { AddMovieFormComponent } from './add-movie-form/add-movie-form.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';



export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'add-movie-form', component: AddMovieFormComponent },
  { path: 'update-movie-form', component: UpdateMovieComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [HeaderComponentComponent, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

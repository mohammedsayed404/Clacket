import { Routes } from '@angular/router';
import { NotFoundComponent } from './Views/Components/NotFound/NotFound.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './Views/Components/register/register.component';
import { LoginComponent } from './Views/Components/login/login.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './Views/Components/home/home.component';
import { authGuard } from './Core/Guards/auth.guard';
import { WatchlistMovieComponent } from './Views/Components/WatchlistMovie/WatchlistMovie.component';
import { LandingPageComponent } from './Views/Components/landing-page/landing-page.component';

export const routes: Routes = [
  
  {
    path: '',component: AuthLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent, title: 'Welcome' }, 
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' }
    ]
  },

 
  {path: '',canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'WatchlistMovie', component: WatchlistMovieComponent, title: 'WatchlistMovie' }
    ]
  },

  { path: '**', component: NotFoundComponent }
];



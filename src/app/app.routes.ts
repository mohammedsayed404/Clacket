import { Routes } from '@angular/router';
import { NotFoundComponent } from './Views/Components/NotFound/NotFound.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './Views/Components/register/register.component';
import { LoginComponent } from './Views/Components/login/login.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './Views/Components/home/home.component';
import { authGuard } from './Core/Guards/auth.guard';
import { WatchlistMovieComponent } from './Views/Components/WatchlistMovie/WatchlistMovie.component';
import { NowPlayingMoviesComponent } from './Views/Components/now-playing-movies/now-playing-movies.component';
import { PopularComponent } from './Views/Components/popular/popular.component';
import { TopRatedComponent } from './Views/Components/top-rated/top-rated.component';
import { UpcomingComponent } from './Views/Components/upcoming/upcoming.component';
import { MovieDetailsComponent } from './Views/Components/movie-details/movie-details.component';
import { MovieDetailComponent } from './Core/components/movie-detail/movie-detail.component';

export const routes: Routes = [
{path:'', canActivate:[authGuard], component:BlankLayoutComponent,children:[

{path:'', redirectTo:'home', pathMatch:'full'},
{path:'home', component:HomeComponent, title:'Home'},
{path:'WatchlistMovie', component:WatchlistMovieComponent, title:'WatchlistMovie'},
{path:'nowPlaying', component:NowPlayingMoviesComponent, title:'nowPlaying'},
{path:'popular', component:PopularComponent, title:'popular'},
{path:'topRated', component:TopRatedComponent, title:'topRated'},
{path:'upcoming', component:UpcomingComponent, title:'upcoming'},
{path:'details', component:MovieDetailsComponent, title:'details'},
{path: 'details/:id', component:MovieDetailComponent, title:'details'},
{path:'**', component: NotFoundComponent},





]},   

{path:'',component:AuthLayoutComponent,children:[
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent, title:'Login' },
  { path: 'register', component: RegisterComponent , title:'Register' },


]},

{ path: '**', component: NotFoundComponent }



];

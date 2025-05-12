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
import { MovieDetailComponent } from './Core/components/movie-detail/movie-detail.component';
import { LandingPageComponent } from './Views/Components/landing-page/landing-page.component';
import { MovieSearchComponent } from './Core/components/movie-search/movie-search.component';
import { MovieCategoryComponent } from './Views/Components/movie-category/movie-category.component';
import { MoviesShowsComponent } from './Views/Components/movies-shows/movies-shows.component';
import { TopTenComponent } from './Views/Components/top-ten/top-ten.component';


export const routes: Routes = [

  //****Blank-Layout****
  {path:'', canActivate:[authGuard], component:BlankLayoutComponent,
    children:[
      // {path:'', redirectTo:'home', pathMatch:'full'}, //I commented this line to avoid redirecting to home page when the app loads => [Salah]
      {path:'home', component:HomeComponent, title:'Clacket'},
      {path:'movies-show', component:MoviesShowsComponent, title:'Movies&Shows'},
      {path:'WatchlistMovie', component:WatchlistMovieComponent, title:'WatchlistMovie'},
      {path:'movie-category/:id', component:MovieCategoryComponent, title:'Category'}, // i will change it later
      {path:'top-ten/:id', component:TopTenComponent, title:'TopTen'}, // i will change it later
      {path:'nowPlaying', component:NowPlayingMoviesComponent, title:'nowPlaying'},
      {path:'movie-search', component:MovieSearchComponent, title:'movie-search'},
      {path:'popular', component:PopularComponent, title:'popular'},
      {path:'topRated', component:TopRatedComponent, title:'topRated'},
      {path:'upcoming', component:UpcomingComponent, title:'upcoming'},
      // {path:'details', component:MovieDetailsComponent, title:'details'},
      {path: 'details/:id', component:MovieDetailComponent, title:'details'},
      {path: 'notFound', component:NotFoundComponent, title:'not found'},
      {path:'**', component: NotFoundComponent},

      //****Auth-Layout****
      {path: '',component: AuthLayoutComponent,
        children: [
          { path: '', component: LandingPageComponent, title: 'Welcome' },
          { path: 'login', component: LoginComponent, title: 'Login' },
          { path: 'register', component: RegisterComponent, title: 'Register' },
          {path:'**', component: NotFoundComponent},
        ]
      },
    ]},

//****NotFound [General]****
{ path: '**', component: NotFoundComponent }

];

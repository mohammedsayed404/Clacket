import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent  implements  OnInit {

  allMovies: NowPlayingMovies[];
  moviesIds: number[]  = [668489,1197306,  1233069,950387,  1471014]
  constructor(private _CategoryService: CategoryService, private _watchlistMovieService:WatchlistMovieService)
  {
    this.allMovies  =  []
  }
  ngOnInit(): void {

    // this._CategoryService.getMovieDetails().subscribe({
    //   next: (res) =>
    //   {
    //     // res.results.map(x =>{  x.

    //     // } )
    //     console.log(res)
    //   },
    //   error: (err) =>
    //   {
    //     console.log(err)
    //   }

    // })

    this.test();
  }

  test() :any
  {
    for(var x of this.moviesIds)
    {
      this._CategoryService.getMovieDetails(x).subscribe({
        next: (res) =>
        {
          // res.results.map(x =>{  x.
  
          // } )
          this.allMovies.push(res)
          console.log(this.allMovies)
          console.log(res)
        },
        error: (err) =>
        {
          console.log(err)
        }
  
      })
    }
  }
}

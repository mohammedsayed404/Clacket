import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { ITopRated } from '../../../Core/Interfaces/itop-rated';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';

@Component({
  selector: 'app-top-rated',
  imports: [],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.css'
})
export class TopRatedComponent implements OnInit {

  topRatedList: NowPlayingMovies[];
  constructor(private _CategoryService: CategoryService,  private _watchlistMovieService:WatchlistMovieService){
    this.topRatedList = []
  }


  ngOnInit(): void {
    this._CategoryService.getTopRatedMovis().subscribe({
      next: (res) => {
        this.topRatedList =  res.results;
        console.log(res.results)
      },
      error: (err) =>{

        console.log(err)
      }
    })
  }

  addToWatchList(movieId: number): void {
    this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
      next: (response) => {
        console.log('Movie added to watchlist:', response);
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value + 1);
      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
      },
    });
  }

  
}

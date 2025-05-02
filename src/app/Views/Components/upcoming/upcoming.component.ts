import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { IUpcoming } from '../../../Core/Interfaces/iupcoming';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';

@Component({
  selector: 'app-upcoming',
  imports: [],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnInit {

  upcomingMovies: NowPlayingMovies[];
  constructor(private _CategoryService: CategoryService,  private _watchlistMovieService:WatchlistMovieService){
    this.upcomingMovies = []
  }


  ngOnInit(): void {
    this._CategoryService.getUpcomingMovis().subscribe({
      next: (res) => {
        this.upcomingMovies =  res.results;
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

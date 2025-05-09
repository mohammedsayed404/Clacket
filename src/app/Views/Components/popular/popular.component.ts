import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';
import { ToastrService } from 'ngx-toastr';
import { ScrollTopComponent } from "../scroll-top/scroll-top.component";
import { IPopular } from '../../../Core/Interfaces/ipopular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular',
  imports: [ScrollTopComponent,
            RouterLink
  ],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent implements  OnInit{

  popularMovies: NowPlayingMovies[];
  constructor(private _CategoryService:CategoryService, private _watchlistMovieService:WatchlistMovieService,
               private _toastr: ToastrService
  ){
    this.popularMovies = []
  }

  ngOnInit(): void {
    this._CategoryService.getPopularMovis().subscribe({
      next: (res) => {
        this.popularMovies = (res as IPopular).results;
      },
      error: (err) =>  {
        
        console.log(err)
      }
    })
  }

  addToWatchList(movieId: number): void {
    this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
      next: (response) => {
        console.log('Movie added to watchlist:', response);
        
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value + 1);
        this._toastr.success(response.status_message, "Clacket")

        
      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
        this._toastr.error(err.status_message, "Clacket")

      },
    });
  }

}

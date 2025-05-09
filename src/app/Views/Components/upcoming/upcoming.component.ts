import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { IUpcoming } from '../../../Core/Interfaces/iupcoming';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';
import { ToastrService } from 'ngx-toastr';
import { ScrollTopComponent } from "../scroll-top/scroll-top.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-upcoming',
  imports: [ScrollTopComponent,
            RouterLink
  ],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnInit {

  upcomingMovies: NowPlayingMovies[];
  constructor(private _CategoryService: CategoryService, 
              private _watchlistMovieService:WatchlistMovieService,
              private _toastr: ToastrService){

    this.upcomingMovies = []
  }


  ngOnInit(): void {
    this._CategoryService.getUpcomingMovis().subscribe({
      next: (res) => {
        this.upcomingMovies = (res as IUpcoming).results;
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
        this._toastr.success(response.status_message, "Clacket")

      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
        this._toastr.error(err.status_message, "Clacket")

      },
    });
  }

}

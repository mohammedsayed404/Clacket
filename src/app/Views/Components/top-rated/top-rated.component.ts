import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { ITopRated } from '../../../Core/Interfaces/itop-rated';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { ScrollTopComponent } from "../scroll-top/scroll-top.component";

@Component({
  selector: 'app-top-rated',
  imports: [ScrollTopComponent],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.css'
})
export class TopRatedComponent implements OnInit {

  topRatedList: NowPlayingMovies[];
  constructor(private _CategoryService: CategoryService,  
              private _watchlistMovieService:WatchlistMovieService,
              private _toastr: ToastrService){
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
        this._toastr.success(response.status_message, "Clacket")

      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
        this._toastr.error(err.status_message, "Clacket")

      },
    });
  }

  
}

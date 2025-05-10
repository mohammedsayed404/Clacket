import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { ScrollTopComponent } from "../scroll-top/scroll-top.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-now-playing-movies',
  imports: [ScrollTopComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './now-playing-movies.component.html',
  styleUrl: './now-playing-movies.component.css'
})
export class NowPlayingMoviesComponent implements  OnInit {

  nowPlayingMoviesList: NowPlayingMovies[];
  
  constructor(private _CategoryService: CategoryService,
             private _watchlistMovieService:WatchlistMovieService,
             private _toastr: ToastrService){
    this.nowPlayingMoviesList = [];
  }
  ngOnInit(): void {

    this._CategoryService.getNowPlayingMovis().subscribe({
      next: (res) => {
        this.nowPlayingMoviesList = (res as { results: NowPlayingMovies[] }).results;
      },
      error: (err) => {
        console.log(err);
      },
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


    // this.activatedRoute.paramMap.subscribe({
    //   next: (param) =>
    //   {
    //     this.movieId = param.get("id")
    //     this.movieService.getDetailsUsingHttpClient(this.movieId).subscribe({
    //     next: (res) =>
    //     {
    //         this.movie = res;
    //         this.loading = false;
    //         console.log(res)

    //         if (this.movie.videos.results.length > 0) {
    //           this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    //             `https://www.youtube.com/embed/${this.movie.videos.results[0].key}?autoplay=1&loop=1`
    //           ) as string;
    //         }

    //     },
    //     error: (err) =>
    //     {
    //       console.log(err)
    //       this.loading = false;

    //     }
    // })
    //   },
    //   error : (err) =>
    //   {
    //     console.log(err)
    //   }

    // })
  

}
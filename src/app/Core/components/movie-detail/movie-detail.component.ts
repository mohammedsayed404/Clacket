import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../Services/movies.service';
import { Crew, IMovie } from '../../models/IMovie.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { TmdbImageUrlPipe } from "../../pipes/tmdb-image-url.pipe";
import { MatIconModule } from '@angular/material/icon';
import { CastCarouselComponent } from '../cast-carousel/cast-carousel/cast-carousel.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { WatchlistMovieService } from '../../Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../Interfaces/Movie';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselComponent } from 'ngx-owl-carousel-o';




@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule,RouterModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule,
    MatChipsModule, TmdbImageUrlPipe, MatIconModule, CastCarouselComponent, MatDividerModule,
     CarouselModule ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {

  movieId: any = 0;
  movie: IMovie | undefined;
  videoUrl: string | undefined;
  WatchlistMovielist:number[] = [];

  constructor(private movieService: MoviesService, @Inject(DomSanitizer) private sanitizer: DomSanitizer,
   private activatedRoute: ActivatedRoute , private _watchlistMovieService: WatchlistMovieService,
  private _toastr: ToastrService,) {}
  ngOnInit(): void {
    this.movieId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.movieId !== 0) {
      this.movieService.getDetails(this.movieId).then((movie:any) => {
        console.log(movie);

        this.movie = movie as IMovie;
        if (this.movie.videos.results.length > 0) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${this.movie.videos.results[0].key}?autoplay=1&loop=1`
          ) as string;
        }
      }).catch((error) => {
        console.error('Error fetching movie details:', error);
      });
    }
this.refreshWatchlistData();

  }


getDirector(): Crew | undefined {

const Directing= this.movie?.credits.crew?.find(member => member.known_for_department === 'Directing');
if(Directing)
  return Directing;
else return;
}


refreshWatchlistData():void{
    this._watchlistMovieService.getClacketWatchlist().subscribe({
      next: ({movieIds}) => {
        this.WatchlistMovielist = movieIds;
        console.log(movieIds);
       }

  });
}
  addToWatchList(movieId: number): void {
    this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
      next: ({movieIds}) => {
        this.WatchlistMovielist = movieIds;
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value + 1);
        this._toastr.success("Moview added sussufully ")
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }


  RemoveFromWatchlist(movieId: number): void {

    this._watchlistMovieService.RemoveFromWatchlist(movieId).subscribe({
      next: ({movieIds}) => {
        this.WatchlistMovielist = movieIds;
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value - 1);
        this._toastr.success("movie removed sussufully");

      },
      error: (err) => {
        this._toastr.error(err);
      },
    });

}

getMusicain(): Crew | undefined {

const sound= this.movie?.credits.crew?.find(member => member.known_for_department === 'Sound');
if(sound)
  return sound;
else return;
}
goBack() {
  window.history.back();
}


@ViewChild('castCarousel', { static: false }) castCarousel?: CarouselComponent;


castSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay: true,
  navSpeed: 700,
  navText: ['‹', '›'],
  responsive: {
    0: { items: 2 },
    400: { items: 3 },
    600: { items: 4 },
    768: { items: 6 },
    1024: { items: 9 },
    1200: { items: 9 },
    1400: { items: 9 }
  },
  nav: false,
  //  dotsEach: true,
};


goNext() {
  this.castCarousel?.next();
}

goPrev() {
  this.castCarousel?.prev();
}



}

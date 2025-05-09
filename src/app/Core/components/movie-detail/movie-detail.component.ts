import { Component, Inject, OnInit } from '@angular/core';
import { MoviesService } from '../../Services/movies.service';
import { IMovie } from '../../models/IMovie.interface';
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

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatChipsModule, TmdbImageUrlPipe, MatIconModule, CastCarouselComponent, MatDividerModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movieId: any = 0;
  movie: IMovie | undefined;
  loading = true;
  videoUrl: string | undefined;
  /**
   *
   */
  constructor(private movieService: MoviesService, @Inject(DomSanitizer) private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.movieId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.movieId !== 0) {
      this.movieService.getDetails(this.movieId).then((movie) => {
        this.movie = movie as IMovie;
        this.loading = false;
        if (this.movie.videos.results.length > 0) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${this.movie.videos.results[0].key}?autoplay=1&loop=1`
          ) as string;
        }
      }).catch((error) => {
        console.error('Error fetching movie details:', error);
        this.loading = false;
      });
    }

  
  }
  goBack() {
    window.history.back();
  }
}

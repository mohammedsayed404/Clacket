
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { Subscription } from 'rxjs';
import { API } from '../../../API/API';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {

  constructor(private _mockMoviesService:MockMoviesService ) { }

  tridingMovieSubscribe:Subscription= new Subscription();
  moviesList:any[] = [];
  ngOnInit() {

    this.tridingMovieSubscribe = this._mockMoviesService.GetTrindingMovies().subscribe({
      next: ({results}) => {
        this.moviesList = results
        console.log(this.moviesList);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  ngOnDestroy(): void {
    this.tridingMovieSubscribe.unsubscribe();
  }

}

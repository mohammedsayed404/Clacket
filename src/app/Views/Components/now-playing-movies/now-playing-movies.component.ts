import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';

@Component({
  selector: 'app-now-playing-movies',
  imports: [],
  templateUrl: './now-playing-movies.component.html',
  styleUrl: './now-playing-movies.component.css'
})
export class NowPlayingMoviesComponent implements  OnInit {

  nowPlayingMovies: NowPlayingMovies[];
  constructor(private _CategoryService: CategoryService){
    this.nowPlayingMovies = [];
  }
  ngOnInit(): void {

    this._CategoryService.getNowPlayingMovis().subscribe({
      next: ({results}) => {
        this.nowPlayingMovies = results;
        console.log(results);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }



}

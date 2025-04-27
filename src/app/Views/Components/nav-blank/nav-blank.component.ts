import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {

  watchlistCount:number = 0;

  constructor(private _router:Router,private _watchlistMovieService:WatchlistMovieService) { }


  ngOnInit(): void {

    this._watchlistMovieService.total_results.subscribe({
      next: (count:number) => {
        this.watchlistCount = count;
        console.log(count);
      },
      error: (err) => {
        console.log(err);
      },
    })


    this._watchlistMovieService.GetWatchlist().subscribe({
      next: (response) => {
        this.watchlistCount = response.total_results;
        this._watchlistMovieService.total_results.next(response.total_results);
        console.log(response);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }


LogOut():void {
  localStorage.clear();
  this._router.navigate(['/login']);
}

}

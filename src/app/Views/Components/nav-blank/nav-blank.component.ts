import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, viewChild} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { AccountService } from '../../../Core/Services/Account.service';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {

  constructor(private _router:Router,
    private _watchlistMovieService:WatchlistMovieService ,
     private _renderer2:Renderer2 , private router: Router,private _AccountService:AccountService) { }

  watchlistCount:number = 0;
  ClacketWatchlistCount:number[] = [];

//   @ViewChild('navBlank') navBlank:ElementRef | undefined ;
//   @HostListener('window:scroll', ['$event'])
//   onWindowScroll(event: Event) {
// this.toggleNavbarClass();

//   }


//   toggleNavbarClass(): void {
//     const nav = this.navBlank?.nativeElement;
//     const scrolled = window.scrollY > 20;

//     if (scrolled) {
//       this._renderer2.addClass(nav, 'navbar-fixed-animate');
//       this._renderer2.removeClass(nav, 'navbar-large');
//       this._renderer2.addClass(nav, 'px-5');
//     } else {
//       this._renderer2.removeClass(nav, 'navbar-fixed-animate');
//       this._renderer2.addClass(nav, 'navbar-large');
//       this._renderer2.removeClass(nav, 'px-5');
//     }
//   }

goToSearch() {
  this.router.navigate(['/movie-search'], {
    state: { focusInput: true }
  });
}



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



    this._watchlistMovieService.getClacketWatchlist().subscribe({
      next: ({movieIds}) => {
        this._watchlistMovieService.total_results.next(movieIds.length);
        console.log(movieIds.length);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }


 getRole():string | undefined{
  return this._AccountService.GetAdmin();
 }

LogOut():void {
  localStorage.clear();
  this._router.navigate(['/login']);
}

}

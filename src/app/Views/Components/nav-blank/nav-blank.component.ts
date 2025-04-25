import { Component} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent {

  constructor(private _router:Router) { }


LogOut():void {
  localStorage.clear();
  this._router.navigate(['/login']);
}

}

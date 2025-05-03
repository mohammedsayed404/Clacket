import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-auth',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css']
})
export class NavAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

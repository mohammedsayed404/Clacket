import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBlankComponent } from "../../Views/Components/nav-blank/nav-blank.component";
import { FooterComponent } from '../../Views/Components/Footer/Footer.component';

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, NavBlankComponent,FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

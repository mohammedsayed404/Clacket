import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-NotFound',
  imports: [RouterLink],
  templateUrl: './NotFound.component.html',
  styleUrls: ['./NotFound.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() posterPath: string = '';
  @Input() title: string = '';
}

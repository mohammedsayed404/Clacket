import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieDetailComponent } from "./Core/components/movie-detail/movie-detail.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Clacket';
}

import { Component, Input, input, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-navigation-controls',
  imports: [],
  templateUrl: './navigation-controls.component.html',
  styleUrl: './navigation-controls.component.css'
})
export class NavigationControlsComponent {

@Input() CarouselName: CarouselComponent | undefined;

goNext() {
  this.CarouselName?.next();
}
goPrev() {
  this.CarouselName?.prev();
}

}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselComponent } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-genres',
  imports: [RouterLink,CarouselModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {



constructor() {}





GenresSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };




}

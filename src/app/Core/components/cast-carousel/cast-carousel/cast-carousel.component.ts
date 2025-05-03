import { Component, ElementRef, Input, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, effect } from '@angular/core';
import { TmdbImageUrlPipe } from "../../../pipes/tmdb-image-url.pipe";
import { CommonModule } from '@angular/common';
import { Cast } from '../../../models/IMovie.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-carousel',
  imports: [TmdbImageUrlPipe, CommonModule],
  templateUrl: './cast-carousel.component.html',
  styleUrls: ['./cast-carousel.component.css', '../../../../../../node_modules/swiper/swiper-bundle.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CastCarouselComponent {
  @Input() castList: Cast[] | undefined;
  @ViewChild('swiperContainer') swiperContainer: ElementRef | undefined;
  transform = 100;
  selectedIndex = 0;
  /**
   *
   */
  constructor() {
    effect(() => {
      if (this.castList?.length !== undefined && this.castList.length > 0) {// Initialize Swiper after the view has been initialized
        new Swiper(this.swiperContainer?.nativeElement, {
          slidesPerView: 3,
          slidesPerGroup: 2,
          centeredSlides: true,
          loop: true,
          cssMode: true,
          breakpoints: {
            600: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            900: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1200: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1500: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1800: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            }
          },
          spaceBetween: 30,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          }
        });
        this.swiperContainer?.nativeElement.initialize();
      }
    });
  }
  downSelected(i: number) {
    if (this.castList?.length) {
      this.transform = 100 - i * 100 / this.castList.length;
      this.selectedIndex += 1;
      if (this.selectedIndex >= this.castList.length) {
        this.selectedIndex = 0;
      }
    }
  }
  selected(x: number) {
    this.downSelected(x);
    this.selectedIndex = x;
  }

}

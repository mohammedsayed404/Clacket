import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  imports: [  CommonModule],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.css'
})
export class ScrollTopComponent {

  isVisible = false;

  // Listen for scroll events on the window
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show the button when scrolled 100px from the top
    this.isVisible = window.pageYOffset > 100;
  }

  // Scroll to top method
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // window.scrollTo({top : 0,})
  }

  // scrollToTop(): void {
  //   const scrollDuration = 1500; // 1.5 seconds duration for smooth scroll
  //   const scrollStep = -window.scrollY / (scrollDuration / 15);
  //   const scrollInterval = setInterval(() => {
  //     if (window.scrollY <= 0) {
  //       clearInterval(scrollInterval); // Stop the interval when we reach the top
  //     }
  //     window.scrollBy(0, scrollStep); // Scroll by a step
  //   }, 15); // Interval of 15ms for smoother transition
  // }

}



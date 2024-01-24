import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() images: carouselImage[] = [];
  @Input() indicators = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 8000;
  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }
  autoSlideImages() {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  selectedIndex = 0;
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  getTenisImageURL(url: string): string {
    if (url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }
}

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
  bannerLink?: string;
}

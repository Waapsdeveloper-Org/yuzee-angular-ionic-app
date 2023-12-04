import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: ['./video-slider.component.scss'],
})
export class VideoSliderComponent implements OnInit {

  @Input() videoArray;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 2.1,
    centeredSlides: false,
  };
  currentIndex: number;
  constructor() { }

  ngOnInit() {}

  slideChanged($event) {
    this.slides.getActiveIndex().then((index) => {
      this.currentIndex = index;
    });
  }

}

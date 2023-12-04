import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-searched-video',
  templateUrl: './searched-video.component.html',
  styleUrls: ['./searched-video.component.scss'],
})
export class SearchedVideoComponent implements OnInit {
  SelectedCategory: any;
  constructor(public modalCtrl: ModalController) { }
  ngOnInit() {
    localStorage.setItem('tabName','videos');
    this.SelectedCategory = localStorage.getItem('tabName');
  }

}

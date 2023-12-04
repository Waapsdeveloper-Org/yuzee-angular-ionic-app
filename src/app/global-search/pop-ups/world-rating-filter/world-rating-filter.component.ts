import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-world-rating-filter',
  templateUrl: './world-rating-filter.component.html',
  styleUrls: ['./world-rating-filter.component.scss'],
})
export class WorldRatingFilterComponent implements OnInit {

  min : any = '1,000';
  max : any = '- 3,000';

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

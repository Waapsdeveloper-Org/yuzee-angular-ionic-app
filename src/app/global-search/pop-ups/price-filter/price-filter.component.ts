import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent implements OnInit {

  minValue: any = '100';
  maxValue: any = '5000';

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  back() {
    this.modalCtrl.dismiss();
  }
  onIonChange(event){
    this.minValue = event.detail.value.lower;
    this.maxValue = event.detail.value.upper;
  }
}

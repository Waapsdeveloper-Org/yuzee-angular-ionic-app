import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delivery-filter',
  templateUrl: './delivery-filter.component.html',
  styleUrls: ['./delivery-filter.component.scss'],
})
export class DeliveryFilterComponent implements OnInit {

  DeliveryMethod: any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.DeliveryMethod = [
      {
        method: 'Online',
        isselected: false,
      },
      {
        method: 'Classroom',
        isselected: true,
      },
      {
        method: 'Distance',
        isselected: false,
      },
      {
        method: 'Blended',
        isselected: true,
      }
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

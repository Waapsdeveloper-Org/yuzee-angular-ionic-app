import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-validity-filter',
  templateUrl: './validity-filter.component.html',
  styleUrls: ['./validity-filter.component.scss'],
})
export class ValidityFilterComponent implements OnInit {

  ValidityList : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.ValidityList = [
      {
        Validity: 'Domestic',
        isselected: false,
      },
      {
        Validity: 'International',
        isselected: true,
      }
    ]
  }

  back(){
    this.modalCtrl.dismiss();
  }

}

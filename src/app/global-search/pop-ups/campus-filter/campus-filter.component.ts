import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-campus-filter',
  templateUrl: './campus-filter.component.html',
  styleUrls: ['./campus-filter.component.scss'],
})
export class CampusFilterComponent implements OnInit {

  AllCampus : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.AllCampus = [
      {
        name: 'On-campus',
        isselected: false,
      },
      {
        name: 'Off-campus',
        isselected: true,
      }
    ]
  }

  back(){
    this.modalCtrl.dismiss();
  }


}

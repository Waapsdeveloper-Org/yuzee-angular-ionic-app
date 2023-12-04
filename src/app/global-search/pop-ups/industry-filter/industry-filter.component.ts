import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-industry-filter',
  templateUrl: './industry-filter.component.html',
  styleUrls: ['./industry-filter.component.scss'],
})
export class IndustryFilterComponent implements OnInit {

  AllIndustries : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.AllIndustries = [
      {
        name: 'Agriculture',
        isselected: false,
      },
      {
        name: 'Construction',
        isselected: false,
      },
      {
        name: 'Education',
        isselected: false,
      },
      {
        name: 'Information Technology',
        isselected: true,
      },
      {
        name: 'Telecommunications',
        isselected: false,
      },
      {
        name: 'Restaurant',
        isselected: false,
      },
      {
        name: 'Agriculture',
        isselected: true,
      },
      {
        name: 'Construction',
        isselected: true,
      }
    ]
  }

  back(){
    this.modalCtrl.dismiss();
  }

}

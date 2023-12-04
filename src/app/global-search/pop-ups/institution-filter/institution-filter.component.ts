import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-institution-filter',
  templateUrl: './institution-filter.component.html',
  styleUrls: ['./institution-filter.component.scss'],
})
export class InstitutionFilterComponent implements OnInit {

  instituteList: any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.instituteList = [
      {
        instituteList: 'Humboldt University of Berlin',
        isselected: false
      },
      {
        instituteList: 'The University of Michigan',
        isselected: false
      },
      {
        instituteList: 'Humboldt University of Berlin',
        isselected: false
      },
      {
        instituteList: 'The University of Michigan',
        isselected: true
      },
      {
        instituteList: 'Humboldt University of Berlin',
        isselected: false
      },
    ]
  }

  back(){
    this.modalCtrl.dismiss();
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-posted-by-filter',
  templateUrl: './posted-by-filter.component.html',
  styleUrls: ['./posted-by-filter.component.scss'],
})
export class PostedByFilterComponent implements OnInit {

  Postedby : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.Postedby = [
      {
        name: 'Humboldt University of Berlin',
        isselected: false,
      },
      {
        name: 'Mary Watson',
        isselected: false,
      },
      {
        name: 'Desmond Lee',
        isselected: true,
      },
      {
        name: 'The University of Michigan',
        isselected: true,
      },
      {
        name: 'Jenna Kim',
        isselected: false,
      },
      {
        name: 'University of Toronto',
        isselected: true,
      },
      {
        name: 'Digi Telecommunications',
        isselected: true,
      }
    ]
  }

  back(){
    this.modalCtrl.dismiss();
  }

}

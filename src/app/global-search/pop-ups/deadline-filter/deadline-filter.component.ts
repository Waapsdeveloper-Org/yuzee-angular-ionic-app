import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deadline-filter',
  templateUrl: './deadline-filter.component.html',
  styleUrls: ['./deadline-filter.component.scss'],
})
export class DeadlineFilterComponent implements OnInit {

  month: any = 'June';
  year: any = '2021'

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

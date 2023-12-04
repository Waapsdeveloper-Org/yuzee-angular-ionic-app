import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-salary-filter',
  templateUrl: './salary-filter.component.html',
  styleUrls: ['./salary-filter.component.scss'],
})
export class SalaryFilterComponent implements OnInit {

  minprice : any = '1,000';
  maxprice : any = '- 30,000';

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

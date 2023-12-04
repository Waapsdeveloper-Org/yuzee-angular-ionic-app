import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-funding-filter',
  templateUrl: './funding-filter.component.html',
  styleUrls: ['./funding-filter.component.scss'],
})
export class FundingFilterComponent implements OnInit {

  AllFunding: any = [];

  constructor(public modalCtrl: ModalController) { }


  ngOnInit() {
    this.AllFunding = [
      {
        funding: 'ACFE Pre-Accredited Training',
        isselected: false,
      },
      {
        funding: 'Asylum Seeker VET Program',
        isselected: false,
      },
      {
        funding: 'Free For Service',
        isselected: false,
      },
      {
        funding: 'Free TAFE',
        isselected: true,
      },
      {
        funding: 'PTPTN',
        isselected: false,
      },
      {
        funding: 'Skills first',
        isselected: false,
      },
      {
        funding: 'VET Student Loan',
        isselected: true,
      },
      {
        funding: 'Asylum Seeker VET Program',
        isselected: true,
      },
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

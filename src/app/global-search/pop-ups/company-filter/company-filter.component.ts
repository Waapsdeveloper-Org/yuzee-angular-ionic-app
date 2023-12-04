import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss'],
})
export class CompanyFilterComponent implements OnInit {

  companiesList : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.companiesList = [
      {
        companyname: 'Amazon',
        isselected: false,
        value: 'amazon'
      },
      {
        companyname: 'Apple',
        isselected: false,
        value: 'apple'
      },
      {
        companyname: 'BP',
        isselected: false,
        value: 'bp'
      },
      {
        companyname: 'Costco',
        isselected: true,
        value: 'costco'
      },
      {
        companyname: 'Chevron',
        isselected: false,
        value: 'chevron'
      },
      {
        companyname: 'Huawei',
        isselected: false,
        value: 'huawei'
      },
      {
        companyname: 'Google',
        isselected: true,
        value: 'google'
      },
      {
        companyname: 'Facebook',
        isselected: true,
        value: 'facebook'
      }
    ]
  }

  back(){
    this.modalCtrl.dismiss();
  }

}

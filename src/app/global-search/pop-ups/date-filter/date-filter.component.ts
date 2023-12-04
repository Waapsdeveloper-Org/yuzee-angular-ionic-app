import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit {

  articleDateFilter: any = [];
  eventsDateFilter: any = [];
  categoryname: any;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.categoryname = localStorage.getItem('tabName');
    this.articleDateFilter = [
      {
        companyname: 'Today',
        isselected: false,
      },
      {
        companyname: 'Past week',
        isselected: false,
      },
      {
        companyname: 'Past month',
        isselected: true,
      },
      {
        companyname: 'Past year',
        isselected: true,
      }
    ];

    this.eventsDateFilter = [
      {
        companyname: 'Today',
        isselected: false,
      },
      {
        companyname: 'This week',
        isselected: false,
      },
      {
        companyname: 'This weekend',
        isselected: true,
      },
      {
        companyname: 'Next week',
        isselected: true,
        
      },
      {
        companyname: 'This month',
        isselected: false,
        
      }, 
      {
        companyname: 'This year',
        isselected: true,
        
      },
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

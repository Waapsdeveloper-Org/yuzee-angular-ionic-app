import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-type-filter',
  templateUrl: './type-filter.component.html',
  styleUrls: ['./type-filter.component.scss'],
})
export class TypeFilterComponent implements OnInit {

  AllStudyLevel: any = [];
  IntituteType: any = [];
  EventType: any = [];
  JobType: any = [];
  CompanyType: any = [];
  categoryname: any;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.categoryname = localStorage.getItem('tabName');
    this.AllStudyLevel = [
      {
        studylevel: 'Full-Time',
        isselected: false
      },
      {
        studylevel: 'Part-Time',
        isselected: true
      }
    ]
    this.IntituteType = [
      {
        type: 'Private',
        isselected: false
      },
      {
        type: 'Public',
        isselected: true
      }
    ]
    this.EventType = [
      {
        type: 'In-Person',
        isselected: false
      },
      {
        type: 'Online',
        isselected: true
      }
    ]
    this.JobType = [
      {
        type: 'Part-time',
        isselected: false
      },
      {
        type: 'Full-time',
        isselected: false
      },
      {
        type: 'Casual',
        isselected: false
      },
      {
        type: 'Volunteer',
        isselected: true
      },
      {
        type: 'Permanent',
        isselected: false
      },
      {
        type: 'Temporary',
        isselected: false
      },
      {
        type: 'Internship',
        isselected: true
      },
      {
        type: 'Apprenticeship',
        isselected: true
      },
      {
        type: 'Contract',
        isselected: false
      },
      {
        type: 'Subcontract',
        isselected: false
      },
    ]
    this.CompanyType = [
      {
        type: 'Corporation',
        isselected: false
      },
      {
        type: 'Organisation',
        isselected: true
      },
      {
        type: 'Sole Trader',
        isselected: false
      },
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

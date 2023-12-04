import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-schedule-filter',
  templateUrl: './schedule-filter.component.html',
  styleUrls: ['./schedule-filter.component.scss'],
})
export class ScheduleFilterComponent implements OnInit {

  Schedule: any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {

    this.Schedule = [
      {
        coursename: 'Early shift',
        isselected: false,
      },
      {
        coursename: 'Daily shift',
        isselected: false,
      },
      {
        coursename: 'Afternoon shift',
        isselected: false,
      },
      {
        coursename: 'Evening shift',
        isselected: true,
      },
      {
        coursename: 'Night shift',
        isselected: false,
      },
      {
        coursename: 'Flexible hours',
        isselected: false,
      },
      {
        coursename: 'Rotational shift',
        isselected: true,
      },
      {
        coursename: 'Early shift',
        isselected: true,
      },
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

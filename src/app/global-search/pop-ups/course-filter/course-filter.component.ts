import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.scss'],
})
export class CourseFilterComponent implements OnInit {

  AllCources: any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {

    this.AllCources = [
      {
        coursename: 'Accounting',
        isselected: false,
      },
      {
        coursename: 'Advertising',
        isselected: false,
      },
      {
        coursename: 'Business Administration',
        isselected: false,
      },
      {
        coursename: 'Business Law',
        isselected: true,
      },
      {
        coursename: 'Marketing',
        isselected: false,
      },
      {
        coursename: 'Human Resource',
        isselected: false,
      },
      {
        coursename: 'Economics',
        isselected: true,
      },
      {
        coursename: 'Entrepreneurship',
        isselected: true,
      },
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

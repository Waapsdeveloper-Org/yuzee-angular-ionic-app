import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-faculty-filter',
  templateUrl: './faculty-filter.component.html',
  styleUrls: ['./faculty-filter.component.scss'],
})
export class FacultyFilterComponent implements OnInit {

  AllFaculties : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.AllFaculties = [
      {
        facultyname: 'Agriculture',
        isselected: false,
      },
      {
        facultyname: 'Architecture',
        isselected: false,
      },
      {
        facultyname: 'Art',
        isselected: false,
      },
      {
        facultyname: 'Aviation',
        isselected: true,
      },
      {
        facultyname: 'Business',
        isselected: false,
      },
      {
        facultyname: 'Communication',
        isselected: false,
      },
      {
        facultyname: 'Computer',
        isselected: true,
      },
      {
        facultyname: 'Education',
        isselected: true,
      },
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-study-level-filter',
  templateUrl: './study-level-filter.component.html',
  styleUrls: ['./study-level-filter.component.scss'],
})
export class StudyLevelFilterComponent implements OnInit {

  AllStudyLevels : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.AllStudyLevels = [
      {
        studylevel: 'Secondary',
        isselected: false,
      },
      {
        studylevel: 'Foundation',
        isselected: false,
      },
      {
        studylevel: 'Diploma',
        isselected: false,
      },
      {
        studylevel: 'Undergraduate',
        isselected: true,
      },
      {
        studylevel: 'Postgraduate',
        isselected: false,
      },
      {
        studylevel: 'High School',
        isselected: true,
      }
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

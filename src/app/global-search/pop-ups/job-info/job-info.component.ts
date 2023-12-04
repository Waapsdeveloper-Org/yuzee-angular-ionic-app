import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss'],
})
export class JobInfoComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  back(){
    this.modalCtrl.dismiss();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deadline-date-popup',
  templateUrl: './deadline-date-popup.component.html',
  styleUrls: ['./deadline-date-popup.component.scss'],
})
export class DeadlineDatePopupComponent implements OnInit {

  @Input() startDate: any;
  @Input() endDate: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  goBack(){
    this.modalCtrl.dismiss(null);
  }

  reset(){
    this.startDate = null;
    this.endDate = null;
    this.apply();
  }

  apply(){
    this.modalCtrl.dismiss({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-request-modal',
  templateUrl: './change-request-modal.component.html',
  styleUrls: ['./change-request-modal.component.scss'],
})
export class ChangeRequestModalComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}

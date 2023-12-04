import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-see-all-attachments',
  templateUrl: './see-all-attachments.component.html',
  styleUrls: ['./see-all-attachments.component.scss'],
})
export class SeeAllAttachmentsComponent implements OnInit {
  arrayData = [];
  title = '';
  constructor(private navParams: NavParams,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.arrayData = this.navParams.get('arrayData');
    this.title = this.navParams.get('title');
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}

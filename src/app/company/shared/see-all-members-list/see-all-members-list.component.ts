import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-see-all-members-list',
  templateUrl: './see-all-members-list.component.html',
  styleUrls: ['./see-all-members-list.component.scss'],
})
export class SeeAllMembersListComponent implements OnInit {
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

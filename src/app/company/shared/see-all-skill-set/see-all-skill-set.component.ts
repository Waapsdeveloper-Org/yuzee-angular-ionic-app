import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-see-all-skill-set',
  templateUrl: './see-all-skill-set.component.html',
  styleUrls: ['./see-all-skill-set.component.scss'],
})
export class SeeAllSkillSetComponent implements OnInit {
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

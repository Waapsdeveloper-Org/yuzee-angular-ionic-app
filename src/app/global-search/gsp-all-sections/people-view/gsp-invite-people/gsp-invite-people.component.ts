import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gsp-invite-people',
  templateUrl: './gsp-invite-people.component.html',
  styleUrls: ['./gsp-invite-people.component.scss'],
})
export class GspInvitePeopleComponent implements OnInit {

  form = {
    phone_email : null
  };

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss()
  }

}

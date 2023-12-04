import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import {
  InvitePeopleComponent,
} from 'src/app/global-search/pop-ups/invite-people/invite-people.component';

import { ModalController } from '@ionic/angular';
import { RECOMMENDATIONS_USERS } from 'src/app/app.constants';
import { CcModalService } from 'src/app/services/cc-modal.service';
import { ConfirmationPopupComponent } from 'src/app/shared';
import { MutualFriendsComponent } from '../mutual-friends/mutual-friends.component';
import { NgrxService } from 'src/app/services/store/ngrx.service';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
 @Input('showSeeAllBtn') seeAll = false;
 list = [];
//  peopleArray = RECOMMENDATIONS_USERS;
  constructor(private modalCtrl: ModalController,
    public ngrx: NgrxService,
    private ccModalService: CcModalService) {
      this.ngrx.subscribe(
        "global-search-people",
        this.updateList.bind(this)
      );
    }

  ngOnInit() {}
  updateList(data) {
    this.list = data;  
  }
  async OpenModel(){
    const presentModel = await this.modalCtrl.create({
      component: InvitePeopleComponent,
      showBackdrop: true,
      mode: "ios",
      cssClass: 'change-address-shipping-modal'
    });

    presentModel.onWillDismiss().then((data)=>{
    });

    return await presentModel.present();
  }
  async followUnfollow() {
    const confirmObj = {
      message: "You are about to unfollow Ester Smith",
      heading: "Unfollow",
      button: 'Unfollow'
    }
    await this.ccModalService.present(ConfirmationPopupComponent,
      {extraParams: confirmObj}, "generic-alert-back-delete-modal generic-modal generic-model-backdrops", "", "ios");
  }
  async openMutualFriends() {
    await this.ccModalService.present(MutualFriendsComponent, {}, "generic-medium-popup-modal generic-modal generic-model-backdrops", "", "ios");
  }
}

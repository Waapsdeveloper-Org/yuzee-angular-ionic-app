import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersLikesFillower } from 'src/constants/users-likes-follower-list';
import { UserProfileService } from 'yuzee-shared-lib';
import { GspInvitePeopleComponent } from './gsp-invite-people/gsp-invite-people.component';

@Component({
  selector: 'app-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.scss'],
})
export class PeopleViewComponent implements OnInit {

  GSRObject : any = {};
  getGlobalSearchData : any = [];

  courseInfo: boolean;

  constructor(public modalCtrl: ModalController,private profileServicesApi:UserProfileService) { }

  ngOnInit() {
    // this.getGlobalSearchData = UsersLikesFillower.Users
    console.log(this.getGlobalSearchData)
    console.log(this.getGlobalSearchData.length)
  }

  followConnection(peopleuser){
    console.log(peopleuser)
    peopleuser.isConnectionExist = true
    this.profileServicesApi.followConnectionbyUserId(peopleuser.id)
    .then((data:any) =>{
      console.log(" ===  follow Connection followId === ", data);
    },(err) => {
      console.log(err)
    })
  }

  UnfollowConnection(peopleuser){
    console.log(peopleuser)
    peopleuser.isConnectionExist = false
    this.profileServicesApi.unfollowConnectionfollowId(peopleuser.id)
    .then((data:any) =>{
      console.log(" === Unfollow Connection followId === ", data);
    },(err) => {
      console.log(err)
    })
  }

  openSeeAllCourses(){
    this.courseInfo = !this.courseInfo
  }


  async openInvitePopup(){
    const modal = await this.modalCtrl.create({
      component: GspInvitePeopleComponent,
      cssClass: 'locationBackdrop'
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
          console.log(dataReturned.data)
        }
      }
    });
    return await modal.present();
  }

}

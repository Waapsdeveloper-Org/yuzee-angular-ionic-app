import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { ToastService } from 'src/services/toast.service';
import { InstitutionApiService, UserProfileService } from 'yuzee-shared-lib';



@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss'],
})
export class CreateReviewComponent implements OnInit {

  reviewObject: any = {};

  constructor(
    private toastService: ToastService,
    private sharedService: SharedService,
    private userProfileService: UserProfileService,
    private modalCtrl: ModalController,
    private instituteApiService: InstitutionApiService) { 
      
    }

  ngOnInit() {
    this.getInstituteDetails();
  }

  getInstituteDetails()
  {

    this.reviewObject.entityType = "INSTITUTE";
    this.reviewObject.entityId = this.sharedService.instituteId;
    this.instituteApiService.institutionDetails(this.sharedService.instituteId).then((res) => { this.reviewObject.data = res["data"]; })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .catch((e) => {this.toastService.presentToast(e);});

    if (localStorage.getItem("user_data_details")) {
      this.reviewObject.userData = JSON.parse(localStorage.getItem('user_data_details'));
    }

    this.userProfileService.getUserNetworkCateogry(this.reviewObject.userData.id, this.sharedService.instituteId).then((res: any) => {
      this.reviewObject.studentType = res.data;
      if(this.reviewObject.studentType == "" || this.reviewObject.studentType == null){
        this.reviewObject.isAnonymous = true;
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .catch((e) => {this.toastService.presentToast(e);});
  }
  goBack() {
    this.modalCtrl.dismiss();
  }

}

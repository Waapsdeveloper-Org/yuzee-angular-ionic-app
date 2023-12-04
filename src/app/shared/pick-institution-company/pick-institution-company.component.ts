import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccessibilityServiceApiService } from 'yuzee-shared-lib';
import { signedInAccountArrayInfo } from 'src/app/app.constants';
import { AppGenericService } from 'src/services/generic.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-institution-company',
  templateUrl: './pick-institution-company.component.html',
  styleUrls: ['./pick-institution-company.component.scss'],
})
export class PickInstitutionCompanyComponent implements OnInit {

  signedInAccountArray = signedInAccountArrayInfo;
  @Output() readOutEventAccess = new EventEmitter<any>();
  userAllActivity: any = [];
  userActivityObj: any = {};
  userInformation: any = {};
  loader: Boolean = false;

  constructor(
    private router: Router,
    private genericService: AppGenericService,
    private accessibilityServiceApiService: AccessibilityServiceApiService
  ) { }

  ngOnInit() {
    this.getAllUserActivity('FIRST');
    if (localStorage.getItem("user_data_details")) {
      this.userInformation = JSON.parse(localStorage.getItem("user_data_details"));
    }
  }

  getAllUserActivity(type) {

    this.loader = true;
    this.accessibilityServiceApiService.getAllUserAccessEntity()
      .then((result: any) => {
        const objActivity = result.data;
        this.userAllActivity = objActivity.entities
        this.userAllActivity.forEach(element => {
          element.isActive = false
          if (element.entity_id == this.userActivityObj.entity_id) {
            element.isActive = true
          }
        });
        if(type === 'CHANGE'){
          this.readOutEventAccess.emit('updated')
        }
        this.loader = false;
      }).catch((err) => { });
  }

  getUserActivity(type, obj) {

    this.accessibilityServiceApiService.getUserActiveEntity()
      .then((result: any) => {
        this.userActivityObj = result.data;
        if (this.userActivityObj.entity_id == null) {
          this.userActivityObj.entity_id = obj.entity_id
          this.userActivityObj.active = true
        }
        if (this.userActivityObj.entity_type == null) {
          this.userActivityObj.entity_type = obj.entity_type
        }
        if (this.userActivityObj.entity_name == null) {
          this.userActivityObj.entity_name = obj.entity_name
        }
        localStorage.setItem('user_account_active', JSON.stringify(this.userActivityObj));
        this.getAllUserActivity(type)
      }).catch((err) => {
      });
  }

  changeActivity(activity) {
    this.loader = true;
    this.accessibilityServiceApiService.UserActiveEntity({}, activity.entity_id, activity.entity_type)
      .then((result: any) => {
        this.getUserActivity('CHANGE', activity);
        this.getAllClaimsAssociatedWithUser(activity.entity_id, activity.entity_type);
      });
  }

  setUserAct() {
    if ((this.userActivityObj.entity_type === 'INSTITUTE' || this.userActivityObj.entity_type === 'USER' || this.userActivityObj.entity_type === 'COMPANY')) {
      this.userActivityObj.updated = true;
      this.genericService.userAccessActivty.next(this.userActivityObj);
    }
    else {
      this.loadLandingPage();
    }
  }

  getAllClaimsAssociatedWithUser(entityId, entityType) {
    this.accessibilityServiceApiService.getAllClaimsAssociation('claim', 'association', 'entityId/' + entityId, 'entityType/' + entityType)
      .then((response: any) => {
        if (response?.data) {
          localStorage.setItem('allClaimsAssociation', JSON.stringify(response.data));
          this.navigateToHomePage();
        }
      })
      .catch(err => {
      });
  }


  loadLandingPage() {
  }

  navigateToHomePage() {
    this.router.navigate(['tabs/home']);
  }
}

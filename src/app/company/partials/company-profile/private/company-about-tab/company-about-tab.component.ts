import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyHelperService } from 'src/app/services/company-helper.service';
import { coursesScholarshipsArray } from 'src/app/app.constants';
import { CcBasePage } from 'src/app/shared/cc-base-page/cc-base-page';
import { AddToProfileComponent } from '../add-to-profile/add-to-profile.component';
import { ModalController } from '@ionic/angular';
import { enterFromRightAnimation } from 'src/app/shared/page-transitions/page-enter-transition';
import { leaveToRightAnimation } from 'src/app/shared/page-transitions/page-leave-transition';

@Component({
  selector: 'app-company-about-tab',
  templateUrl: './company-about-tab.component.html',
  styleUrls: ['./company-about-tab.component.scss'],
})
export class CompanyAboutTabComponent extends CcBasePage implements OnInit {

  isInstitute;
  infoCardArray = coursesScholarshipsArray;
  constructor(injector: Injector, private route: ActivatedRoute,
    public ccHelperService: CompanyHelperService,
    private modalCtrl: ModalController) {
    super(injector)
  }

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.isInstitute = res.isInstitute;
    });
  }

  async openAddtoProfile() {
    const modal = await this.modalCtrl.create({
      component: AddToProfileComponent,
      cssClass: 'modal-full-screen-view',
      enterAnimation: enterFromRightAnimation,
      leaveAnimation: leaveToRightAnimation,
      componentProps: {}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== undefined) {
        }
      }
    });
    return await modal.present();
  }

  getEntityId(){
    return this.ccHelperService.companyId
  }

}

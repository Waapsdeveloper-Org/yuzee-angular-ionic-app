import { Component, Injector, Input, OnInit } from '@angular/core';
import { statesWithFlags } from 'src/app/app.constants';
import { InternshipProgramMoreOptionsComponent } from 'src/app/company/shared';
import { CcBasePage } from 'src/app/shared/cc-base-page/cc-base-page';

@Component({
  selector: 'app-view-all-scholarships-details',
  templateUrl: './view-all-scholarships-details.component.html',
  styleUrls: ['./view-all-scholarships-details.component.scss'],
})
export class ViewAllScholarshipsDetailsComponent extends CcBasePage implements OnInit {

  @Input() data: any;
  @Input() deleteScholarship;
  scholarships = {};
  tagsArray = statesWithFlags;
  slideOptsDetails = {};
  @Input() isInstitute;
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
  }
  moreOptions() {
    this.ccModalService.present(InternshipProgramMoreOptionsComponent,
      { hasAccessScholarshipDelete: this.deleteScholarship, isInstitute: this.isInstitute}, "generic-modal generic-model-backdrops generic-alert-popup-modal-with", "", "ios");
  }
  goBack(){
    this.ccModalService.dismiss();
  }
  checkScreen(){
    if(window.innerWidth>=750){
        return 3.4;
    }else{
        return 1.5;
    }
  }
}

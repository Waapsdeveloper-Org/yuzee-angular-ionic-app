/* eslint-disable no-constant-condition */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { validityArray } from 'src/app/app.constants';
import { InternshipProgramMoreOptionsComponent } from 'src/app/company/shared';
import { CancelDeleteDotPopupComponent } from 'src/app/events';
import { ScholarshipHelperService } from 'src/app/services/scholarship-helper.service';

@Component({
  selector: 'app-view-all-scholarships',
  templateUrl: './view-all-scholarships.component.html',
  styleUrls: ['./view-all-scholarships.component.scss'],
})
export class ViewAllScholarshipsComponent implements OnInit {
  languaugeList = [];
  validity = validityArray;
  eligibleNationalityFilter = false;
  dealineFilter = false;
  languageFilter = false;
  validityFilter = false;
  hidden = true;
  title = 'Scholarships';
  ccModalService: any;
  @Input() isInstitute;

  constructor(public scHelper: ScholarshipHelperService,
    private modalCtrl: ModalController) { }

  ngOnInit() {}

  moreOptions() {
    this.ccModalService.present(InternshipProgramMoreOptionsComponent,
      { isInstitute: this.isInstitute}, "generic-modal generic-model-backdrops generic-alert-popup-modal-with", "", "ios");
  }
  goBack(){
    this.modalCtrl.dismiss();
  }

  filterBtns(item) {


    if(item == 'status'){
      this.scHelper.filterScholarshipStatus()
    }

    if(item == 'nationalities'){
      this.scHelper.  filterScholarshipNationalities()
    }

    if(item == 'levels'){
      this.scHelper.filterScholarshiplevels();
    }

    if(item == 'validity'){
      this.scHelper.filterScholarshipValidity();
    }

    if(item == 'deadline'){
      this.scHelper.filterScholarshipDeadline();
    }
    if(item == 'Sortby'){
      this.scHelper.filterScholarshipSortby();
    }

  }

  isFilterActive(item){
    if(item == 'status'){
      return this.scHelper.filterScholarshipStatusIsActive()
    }

    if(item == 'nationalities'){
      return this.scHelper.filterScholarshipNationalitiesIsActive()
    }

    if(item == 'levels'){
      return this.scHelper.filterScholarshiplevelsIsActive();
    }

    if(item == 'validity'){
      return this.scHelper.filterScholarshipValidityIsActive();
    }

    if(item == 'deadline'){
      return this.scHelper.filterScholarshipDeadlineIsActive();
    }
    if(item == 'Sortby'){
      return this.scHelper.filterScholarshipSortbyIsActive();
    }
  }


  clearAll(){
    this.scHelper.clearAllFilters()
  }

  isHiddenClearAll(){

    if('nationalities'){
      return !this.scHelper.filterScholarshipNationalitiesIsActive();
    }
    // eslint-disable-next-line no-constant-condition
    if('levels'){
      return !this.scHelper.filterScholarshiplevelsIsActive();
    }
    if('validity'){
      return !this.scHelper.filterScholarshipValidityIsActive();
    }
    if('deadline'){
      return !this.scHelper.filterScholarshipDeadlineIsActive();
    }
    if('Sortby'){
      return !this.scHelper.filterScholarshipSortbyIsActive();
    }
  }

  searchInput($event){

    let v = $event.target.value;
    this.scHelper.getScholarshipSearch(v);
  }
  async open3dotpopup() {
    const modal = await this.modalCtrl.create({
      component: CancelDeleteDotPopupComponent,
      showBackdrop: true,
      mode: 'ios',
      swipeToClose: true,
      cssClass:
        'generic-modal generic-model-backdrops generic-alert-popup-modal',
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data !== undefined) {
          if (dataReturned.data === 'Cancel event') {
            this.eventCancel();
          } else if (dataReturned.data === 'Delete event') {
            this.eventDelete();
          }
        }
      }
    });
    return await modal.present();
  }
  eventDelete() {
    throw new Error('Method not implemented.');
  }
  eventCancel() {
    throw new Error('Method not implemented.');
  }
}

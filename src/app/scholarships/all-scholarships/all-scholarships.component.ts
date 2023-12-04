import { Component, Injector, Input, OnInit } from '@angular/core';
import { ViewAllScholarshipsDetailsComponent } from '../view-all-scholarships-details/view-all-scholarships-details.component';
import { CcBasePage } from 'src/app/shared/cc-base-page/cc-base-page';
import { ScholarshipHelperService } from 'src/app/services/scholarship-helper.service';

@Component({
  selector: 'app-all-scholarships',
  templateUrl: './all-scholarships.component.html',
  styleUrls: ['./all-scholarships.component.scss'],
})
export class AllScholarshipsComponent extends CcBasePage implements OnInit {

  @Input() limit = 999999;
  @Input() hasAccessScholarshipDelete;
  @Input() isInstitute;

  sliderArray = [
    {
      img: 'assets/svgs/scholarships-slider-offer-icon.svg',
      title: '',
      desc: ''
    },
  ];

  constructor(
    injector: Injector,
    public scHelper: ScholarshipHelperService) {
    super(injector)
  }

  ngOnInit()
  {

  }

  ionViewWillAppear(){

  }

  noItemArray(){
    return this.sliderArray.map( x => {
      x.desc = 'No ' + this.scHelper.params.status + ' scholorship found'
      return x;
    })
  }

  async viewScholarshipDetails(scholarship){



    const res = await this.scHelper.getScholarshipByIdBasedOnEntityAndEntityType(scholarship.entity_id, scholarship.scholarship_id) as any


    if(!res.data){
      return;
    }

    let d = res.data;

    this.ccModalService.present(ViewAllScholarshipsDetailsComponent, {data: d, deleteScholarship: this.hasAccessScholarshipDelete, isInstitute: this.isInstitute}, 'modal-full-screen-view', 'right');

  }

}

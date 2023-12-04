import { Component, OnInit, Input } from '@angular/core';
import { CcModalService } from 'src/app/services/cc-modal.service';
import { GlobalSearchSectionMoreOptionComponent } from '../..';
import { NgrxService } from 'src/app/services/store/ngrx.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  @Input('showSeeAllBtn') seeAll = false;
  @Input('searchCompanyFilterArray') searchCompanyFilterArray = []

  constructor(private ccModalService: CcModalService,public ngrx: NgrxService) {
    this.ngrx.subscribe('global-search-company', this.updateList.bind(this));
   }

  ngOnInit() {
  }
  updateList(data){
    this.searchCompanyFilterArray = data;
  }
  moreOptions() {
    this.ccModalService.present(GlobalSearchSectionMoreOptionComponent, {}, "generic-sm-popup-modal generic-modal generic-model-backdrops", "", "ios");
  }

}

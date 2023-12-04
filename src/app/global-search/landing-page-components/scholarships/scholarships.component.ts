import { Component, OnInit, Input } from '@angular/core';
import { CcModalService } from 'src/app/services/cc-modal.service';
import { GlobalSearchSectionMoreOptionComponent } from '../..';
import { NgrxService } from 'src/app/services/store/ngrx.service';
import { log } from 'console';


@Component({
  selector: 'app-scholarships',
  templateUrl: './scholarships.component.html',
  styleUrls: ['./scholarships.component.scss'],
})
export class ScholarshipsComponent implements OnInit {
  list = [];
  @Input('showSeeAllBtn') seeAll = false;
  constructor(private ccModalService: CcModalService,  public ngrx: NgrxService) {  this.ngrx.subscribe(
    "global-search-scholarship",
    this.updateList.bind(this)
  );}

  ngOnInit() {
  }
  updateList(data) {
    this.list = data;
    
  }
  moreOptions() {
    this.ccModalService.present(GlobalSearchSectionMoreOptionComponent, {}, "generic-sm-popup-modal generic-modal generic-model-backdrops", "", "ios");
  }
}

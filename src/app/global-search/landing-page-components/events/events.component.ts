import { Component, OnInit, Input } from '@angular/core';
import { eventArrayInfo } from 'src/app/app.constants';
import { CcModalService } from 'src/app/services/cc-modal.service';
import { GlobalSearchSectionMoreOptionComponent } from '../..';
import { NgrxService } from 'src/app/services/store/ngrx.service';

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  @Input("showSeeAllBtn") seeAll = false;
  eventsArray = []; //eventArrayInfo;
  constructor(
    private ccModalService: CcModalService,
    public ngrx: NgrxService
  ) {
    this.ngrx.subscribe("global-search-events", this.updateList.bind(this));
  }

  ngOnInit() {}
  updateList(data) {
    this.eventsArray = data;
  }
  moreOptions() {
    this.ccModalService.present(
      GlobalSearchSectionMoreOptionComponent,
      {},
      "generic-sm-popup-modal generic-modal generic-model-backdrops",
      "",
      "ios"
    );
  }
}

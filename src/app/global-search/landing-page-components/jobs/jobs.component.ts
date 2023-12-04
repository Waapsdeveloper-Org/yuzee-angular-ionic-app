import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CcModalService } from 'src/app/services/cc-modal.service';
import { GlobalSearchSectionMoreOptionComponent } from '../..';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  @Input('showSeeAllBtn') seeAll = false;
  @Input('data') dataArray = [];
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private ccModalService: CcModalService) { }

  ngOnInit() {}
  moreOptions() {
    this.ccModalService.present(GlobalSearchSectionMoreOptionComponent, {}, "generic-alert-popup-modal-single-item generic-modal generic-model-backdrops", "", "ios");
  }
  openModal(name: string){
    this.newItemEvent.emit(name);
  }
}

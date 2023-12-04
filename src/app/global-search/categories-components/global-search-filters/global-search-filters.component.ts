import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalSearchMainHelperService } from 'src/app/services/global-search/global-search-main-helper.service';

@Component({
  selector: 'app-global-search-filters',
  templateUrl: './global-search-filters.component.html',
  styleUrls: ['./global-search-filters.component.scss'],
})
export class GlobalSearchFiltersComponent implements OnInit {

  @Input() filtersArray = [];
  @Input() selectedFilter = '';

  @Output() openFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearAll: EventEmitter<any> = new EventEmitter<any>();

  constructor(public gsHelper: GlobalSearchMainHelperService) {}

  ngOnInit() {}

  openFilterPage(filter) {
    this.openFilter.emit(filter);
  }
}

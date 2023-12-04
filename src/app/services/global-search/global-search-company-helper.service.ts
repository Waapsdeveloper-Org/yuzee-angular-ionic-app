import { Injectable, Injector } from '@angular/core';
import { LocationAutocompleteComponent } from 'src/app/shared';
import { ElasticSearchApiService } from 'yuzee-shared-lib';
import { CcModalService } from '../cc-modal.service';
import { ListModalService } from '../listModal.service';
import { NgrxService } from '../store/ngrx.service';
import { GlobalSearchHelperService } from './global-search-helper.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchCompanyHelperService extends GlobalSearchHelperService {

  public searchObject = {
    searchText: '',
    suggestedList: [],
    list: [],
    sizeLength: 10,
    has_next_page: true,
    has_previous_page: false,
    page_number: 1,
    total_count: 0,
    total_pages: 0,
    filters: {
      location: {
        address: null,
      },
      selectedTypes: [],
      selectedIndustries: [],
      type: [],
    },
  };

  constructor(injector: Injector) {
    super(injector);
  }

  getLocation() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = await this.ccModalService.present(
        LocationAutocompleteComponent,
        {
          searchText: this.searchObject.filters.location.address
        },
        'modal-full-screen-view',
        '',
        'md'
      );

      if (res && res.data) {
        const location = res.data;
        this.searchObject.filters.location.address = location.address;
        this.searchObject.page_number = 1;
        resolve(location);
      } else {
        resolve(null);
      }
    });
  }

  getCompanyWithFilters(filterObj: any = null) {
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    return new Promise(async (resolve) => {
      const arr = [];
      if (filterObj) {
        const keys = Object.keys(filterObj);

        keys.forEach((value) => {
          const obj: any = {};
          if (filterObj[value] && filterObj[value] !== '') {
            obj[value] = filterObj[value];
          }
          arr.push(obj);
        });
      }

      const res = (await this.elasticSearch.getCompanyWithFilters(
        this.searchObject.page_number,
        this.searchObject.sizeLength,
        arr
      )) as any;

      if (!res) {
        resolve([]);
        return;
      }

      if (!res.data) {
        resolve([]);
        return;
      }

      if (res && res.data) {
        const d = res.data;
        this.searchObject.page_number = d.page_number;
        this.searchObject.has_next_page = d.has_next_page;
        this.searchObject.has_previous_page = d.has_previous_page;
        this.searchObject.total_count = d.total_count;
        this.searchObject.total_pages = d.total_pages;
        if (d.response && d.response) {
          const lst = d.response;

          if (this.searchObject.page_number === 1) {
            this.searchObject.list = [...lst];
          } else {
            this.searchObject.list = [this.searchObject.list, ...lst];
          }
        }

        resolve(this.searchObject.list);
        return;
      }
    });
  }

  clearAll() {
    return new Promise((resolve) => {
      this.searchObject.page_number = 1;
      this.searchObject.filters.location.address = null;
      this.searchObject.filters.type = this.searchObject.filters.type.map(
        (x) => {
          x.selected = 0;
          return x;
        }
      );
      resolve(true);
    });
  }
}

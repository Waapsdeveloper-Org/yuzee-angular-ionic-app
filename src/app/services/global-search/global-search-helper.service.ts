import { Injectable, Injector } from '@angular/core';
import { ListModalService } from '../listModal.service';
import { GlobalCategories } from 'src/constants/global-categories';
import { Router } from '@angular/router';
import { CcNavService } from '../cc-nav.service';
import {
  CompanyApiService,
  ElasticSearchApiService,
  InstitutionApiService,
} from 'yuzee-shared-lib';
import { SearchKeywordDropdownComponent } from '../../application/popups/search-keyword-dropdown/search-keyword-dropdown.component';
import { log } from 'console';
import { NgrxService } from '../store/ngrx.service';
import { CcModalService } from '../cc-modal.service';

// @Injectable({
//   providedIn: 'root',
// })
export abstract class GlobalSearchHelperService {


  globalSearchObject = {
    searchText: '',
    suggestedList: [],
    list: [],
  };

  search;
  list = [];

  courseList: any = {
    page_number: 1,
    page_size: 10,
    total_count: 0,
    total_pages: 99999,
    list: [],
    search: '',
  };

  public ngrx: NgrxService;
  public listModalService: ListModalService;
  public elasticSearch: ElasticSearchApiService;
  public instituteApiService: InstitutionApiService;
  public ccModalService: CcModalService;
  public nav: CcNavService;

  constructor(injector: Injector) {
    this.ngrx = injector.get(NgrxService);
    this.listModalService = injector.get(ListModalService);
    this.elasticSearch = injector.get(ElasticSearchApiService);
    this.ccModalService = injector.get(CcModalService);
    this.nav = injector.get(CcNavService);
  }



  async gsMainOpenModel() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.openMainFilterSelectionModal()) as any;

      if (res && res.data) {
        const v = res.data.value;

        if (v && v.tabName) {
          this.nav.push(`global-search/${v.tabName}`);
        }
      }

      resolve(true);
    });
  }

  openMainFilterSelectionModal() {
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    return new Promise(async (resolve) => {
      const list = GlobalCategories.categories;
      const res = await this.listModalService.present(
        'Categories',
        list,
        'name',
        'generic-large-popup-modal generic-modal generic-model-backdrops',
        '',
        false,
        false,
        '',
        null
      );

      resolve(res);
    });
  }

  instituteGlobalSearch() {
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
  }

  getCoursesByInstituteId(id, pageNumber: number, pageSize: number) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor, no-shadow
    return new Promise(async (resolve) => {
      const res = (await this.elasticSearch.searchCourseInstituteId(
        '9d36d3d1-3558-4937-bd35-9db505166c3d',
        1,
        10
      )) as any;

      if (res && res.data) {
        const npage = res.data.page_number + 1;
        resolve({
          page: npage,
          list: res.data.response,
        });
      } else {
        resolve({
          page: -1,
          list: [],
        });
      }
    });
  }


}

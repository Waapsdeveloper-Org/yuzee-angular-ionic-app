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
import { GlobalSearchHelperService } from './global-search-helper.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchMainHelperService extends GlobalSearchHelperService {


  constructor(injector: Injector) {
    super(injector);
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



}

import { Injectable, Injector } from '@angular/core';
import { GlobalSearchHelperService } from './global-search-helper.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchArticleHelperService extends GlobalSearchHelperService {

  searchObject = {
    searchText: '',
    suggestedList: [],
    list: [],
  };

  constructor(injector: Injector) {
    super(injector);
  }
}

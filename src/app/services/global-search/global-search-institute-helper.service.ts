import { Injectable, Injector } from '@angular/core';
import { InstitutionApiService } from 'yuzee-shared-lib';
import {
  DurationFilterComponent,
  LocationAutocompleteComponent,
} from 'src/app/shared';
import { GlobalSearchHelperService } from './global-search-helper.service';
import { globalSearchInstituteCategoryList } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchInstituteHelperService extends GlobalSearchHelperService {
  search = '';
  list = [];
  searchObject = {
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
      category: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: globalSearchInstituteCategoryList,
        search: '',
        selected_list: [],
      },
      ranking: {
        min_value: 0,
        max_value: 100,
        selected_min_value: 0,
        selected_max_value: 100,
      },
      type: [
        {
          id: 0,
          key: 'PUBLIC',
          name: 'Public',
          src: 'assets/images/lock-blue.svg',
          selected: 0,
        },
        {
          id: 1,
          key: 'PRIVATE',
          name: 'Private',
          src: 'assets/images/lock-blue.svg',
          selected: 0,
        },
      ],
    },
  };

  constructor(injector: Injector, private instServ: InstitutionApiService) {
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

  getTypeList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      let selectedValue = null;
      let types = this.searchObject.filters.type;

      // find the selected value of filter to be passed as selected
      const v = types.find((x) => x.selected === 1);
      if (v) {
        selectedValue = v.name;
      }

      const res = await this.listModalService.present(
        'Types',
        types,
        'name',
        'generic-small-popup-modal-without generic-modal generic-model-backdrops',
        '',
        false,
        false,
        '',
        selectedValue
      );

      if (res && res.data && res.data.value) {
        const d = res.data.value;

        const index = types.findIndex((x) => x.id === d.id);
        if (index !== -1) {
          types = types.map((x) => {
            x.selected = 0;
            return x;
          });

          types[index].selected = 1;
          this.searchObject.page_number = 1;
          resolve(types[index].key);
        }
      }

      if (res && res.data && res.data.reset) {
        this.searchObject.filters.type = types.map((x) => {
          x.selected = 0;
          return x;
        });

        // will clean it after testing
        // this.filterObj.institute_affiliaction_type = null;
        // const bindex = this.filterArray.findIndex(
        //   (x) => x.name === 'Type'
        // );
        // if (bindex !== -1) {
        //   this.filterArray[bindex].count = 0;
        //   this.filterArray[bindex].active = false;
        // }

        this.searchObject.page_number = 1;
        resolve(null);
      }
    });
  }

  getRanking() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = this.searchObject.filters.ranking;

      const res = await this.ccModalService.present(
        DurationFilterComponent,
        { title: 'World Ranking', data },
        'generic-medium-popup-modal generic-modal generic-model-backdrops',
        '',
        'ios'
      );

      if (res) {
        if (res.data) {
          this.searchObject.filters.ranking = res.data;

          const obj: any = {
            selected_min_value: 0,
            selected_max_value: null,
          };

          obj.selected_min_value = res.data.selected_min_value;
          obj.selected_max_value = res.data.selected_max_value;

          if (res.data.reset === true) {
            obj.selected_min_value = 0;
            obj.selected_max_value = null;
          }

       
          this.searchObject.page_number = 1;
          resolve(obj);
        }
      }
    });
  }

  getCategoryList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = '';
      this.list = [];

      // call api here and wait and get result
      const data = (await this.getCategoryData()) as any[];

      const selected = this.searchObject.filters.category.selected_list;
      data.map((x) => {
        const flag = selected.some((y) => y.name === x.name);
        x.isActive = flag;
        return x;
      });

     

      this.listModalService
        .multiPresent(
          'Category',
          data,
          'name',
          'generic-modal generic-large-popup-modal',
          '',
          false,
          'Search'
        )
        .then((res) => {
          if (res.data && res.data.reset) {
            const obj = {
              data: {
                value: {
                  faculty_id: null,
                  name: null,
                },
              },
            };

            resolve(obj);
            return;
          }

          if (res.data && res.data) {
            this.searchObject.filters.category.selected_list = res.data;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });

      // await this.getCategoryFromElastic();
      // this.ngrx.publish(
      //   "app-generic-multi-searchable-radio-selection:get:search-list",
      //   this.list
      // );
    });
  }

  getCategoryData() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const cnlist = globalSearchInstituteCategoryList;
      this.searchObject.filters.category.list = cnlist;
      const list = this.searchObject.filters.category.list;
      // if (list.length === 0) {
      //   list = (await this.getCategoryFromElastic()) as any[];
      // }
   
      resolve(list);
    });
  }

  getCategoryFromElastic() {
    return new Promise((resolve) => {
      this.instServ.getInstituionPopup().then((res: any) => {
        if (res.length > 0) {
          const data = res;
          resolve(data);
        } else {
          resolve([]);
        }
      });
    });
  }

  getInstitutionWithFilters(filterObj: any = null) {
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

      const res = (await this.elasticSearch.getInstitutionWithFilters(
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
      this.searchObject.filters.category.selected_list = [];
      this.searchObject.filters.ranking.selected_max_value = 100;
      this.searchObject.filters.ranking.selected_min_value = 0;
      this.searchObject.filters.type = this.searchObject.filters.type.map(
        (x) => {
          x.selected = 0;
          return x;
        }
      );
      resolve(true);
    });
  }

  // This is a function which subject to change in future for usage
  getCourseBySearch() {
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    return new Promise(async (resolve) => {
      // get selected categories
      const obj = {
        pageNumber: 1,
        pageSize: 4,
        institute_id: 'ccfba97c-0e8b-4c0d-a80e-c2ae9b847d68',
        faculty_names: '',
        country_names: '',
        city_names: '',
        institute_types: '',
      };

      const res = (await this.elasticSearch.getCourseBySearch(obj)) as any;

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
        resolve(d.response);
        return;
      }
    });
  }
}

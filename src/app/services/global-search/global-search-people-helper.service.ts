import { Injectable, Injector } from '@angular/core';
import { LocationAutocompleteComponent } from 'src/app/shared';
import { GlobalSearchHelperService } from './global-search-helper.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchPeopleHelperService extends GlobalSearchHelperService {
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
      institution: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: '',
        selected_list: [],
      },
      company: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: '',
        selected_list: [],
      },
    },
  };

  constructor(injector: Injector) {
    super(injector);
    this.ngrx.subscribe(
      'app-generic-multi-searchable-radio-selection:post:search-list',
      async (data) => {
        const title = data.title ? data.title.toLowerCase() : '';
        this.search = data.search;
   
        switch (title) {
          case 'institution':
            await this.getInstitutionFromElastic(this.search, 1);
            this.ngrx.publish(
              'app-generic-multi-searchable-radio-selection:get:search-list',
              this.list
            );
            break;
          case 'company':
            await this.getCompanyFromElastic(this.search, 1);
            this.ngrx.publish(
              'app-generic-multi-searchable-radio-selection:get:search-list',
              this.list
            );
            break;
        }
      },
      true
    );

    this.ngrx.subscribe(
      'app-generic-multi-searchable-radio-selection:paginate:search-list',
      async (data) => {
        const title = data.title ? data.title.toLowerCase() : '';
        this.search = data.search;
        
        switch (title) {
          case 'institution':
            await this.getInstitutionFromElastic(this.search);
            this.ngrx.publish(
              'app-generic-multi-searchable-radio-selection:get:paginate:search-list',
              this.list
            );
            break;
          case 'company':
            await this.getCompanyFromElastic(this.search);
            this.ngrx.publish(
              'app-generic-multi-searchable-radio-selection:get:paginate:search-list',
              this.list
            );
            break;
        }
      },
      true
    );
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

  getInstituionList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = '';
      this.list = [];

      this.listModalService
        .multiPresent(
          'institution',
          this.searchObject.filters.institution.list,
          'name',
          'generic-modal generic-large-popup-modal',
          '',
          true,
          'Search'
        )
        .then((res) => {
          if (res && res.data && res.data.reset) {
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

          if (res && res.data) {
           
            this.searchObject.filters.institution.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });

      await this.getInstitutionFromElastic();

      this.ngrx.publish(
        'app-generic-multi-searchable-radio-selection:get:search-list',
        this.list
      );
    });
  }

  getInstitutionFromElastic(search = null, page = 1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const size = this.searchObject.filters.institution.page_size;
      const tpage = this.searchObject.filters.institution.total_pages;
      if (page > tpage) {
        resolve(false);
        return;
      }

      if (page === 1) {
        this.searchObject.filters.institution.page_number = page;
      } else {
        this.searchObject.filters.institution.page_number =
          this.searchObject.filters.institution.page_number + 1;
      }

      let obj = null;
      if (search) {
        obj = [
          {
            institute_name: search,
          },
        ];
      }

      const res = (await this.elasticSearch.getInstitutionWithFilters(
        this.searchObject.filters.institution.page_number,
        size,
        obj
      )) as any;
      // this.courseSearchObject.filters.institution = res.response;
        if (res.data) {
        const d = res.data;
        this.searchObject.filters.institution.page_number = d.page_number;
        this.searchObject.filters.institution.total_count = d.total_count;
        this.searchObject.filters.institution.total_pages = d.total_pages;

        if (page > 1) {
          this.searchObject.filters.institution.list = [
            ...this.searchObject.filters.institution.list,
            ...d.response,
          ];
        } else {
          this.searchObject.filters.institution.list = d.response;
        }

        this.list = this.searchObject.filters.institution.list;
      }

      resolve(true);
    });
  }

  getCompanyList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = '';
      this.list = [];

      this.listModalService
        .multiPresent(
          'Company',
          this.searchObject.filters.company.list,
          'company_name',
          'generic-modal generic-large-popup-modal',
          '',
          true,
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
            this.searchObject.filters.company.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });

      await this.getCompanyFromElastic();
      this.ngrx.publish(
        'app-generic-multi-searchable-radio-selection:get:search-list',
        this.list
      );
    });
  }

  getCompanyFromElastic(search = null, page = 1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const size = this.searchObject.filters.company.page_size;
      const tpage = this.searchObject.filters.company.total_pages;

      if (page > tpage) {
        resolve(false);
        return;
      }

      if (page === 1) {
        this.searchObject.filters.company.page_number = page;
      } else {
        this.searchObject.filters.company.page_number =
          this.searchObject.filters.company.page_number + 1;
      }

      let obj = null;
      if (search) {
        obj = [
          {
            company_name: search,
          },
        ];
      }

      const res = (await this.elasticSearch.getCompanyWithFilters(
        this.searchObject.filters.company.page_number,
        size,
        obj
      )) as any;
      // this.courseSearchObject.filters.institution = res.response;
            if (res.data) {
        const d = res.data;

        this.searchObject.filters.company.page_number = d.page_number;
        this.searchObject.filters.company.total_count = d.total_count;
        this.searchObject.filters.company.total_pages = d.total_pages;

        if (page > 1) {
          this.searchObject.filters.company.list = [
            ...this.searchObject.filters.company.list,
            ...d.response,
          ];
        } else {
          this.searchObject.filters.company.list = d.response;
        }

        this.list = this.searchObject.filters.company.list;
      }

      resolve(true);
    });
  }

  getPeopleWithFilters(filterObj: any = null) {
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

      const res = (await this.elasticSearch.getPeoplesWithFilters(
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
      this.searchObject.filters.institution.selected_list = [];
      this.searchObject.filters.company.selected_list = [];
      resolve(true);
    });
  }
}

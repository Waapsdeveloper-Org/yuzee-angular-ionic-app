import { Injectable, Injector } from '@angular/core';
import { LocationAutocompleteComponent } from 'src/app/shared';
import { STUDYMODES } from 'src/app/app.constants';
import { GlobalSearchHelperService } from './global-search-helper.service';
import { InstitutionApiService } from 'yuzee-shared-lib';
@Injectable({
  providedIn: "root",
})
export class GlobalSearchScholorshipHelperService extends GlobalSearchHelperService {
  search = "";
  list = [];
  searchObject = {
    searchText: "",
    suggestedList: [],
    page_number: 1,
    page_size: 5,
    total_count: 0,
    total_pages: 99999,
    list: [],
    search: "",
    has_next_page: true,
    has_previous_page: false,

    filters: {
      location: {
        address: null,
      },
      studyLevel: {
        list: STUDYMODES,
        selected_list: [],
      },
      Deadline_type: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [
          {
            id: 1,
            name: "2023",
            key: "2023",
          },
          {
            id: 2,
            name: "2022",
            key: "2022",
          },
          {
            id: 2,
            name: "2021",
            key: "2021",
          },
        ],
        search: "",
        selected_list: [],
      },
      validity: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: "",
        selected_list: [],
      },
      Level: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: "",
        selected_list: [],
      },
      institution: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: "",
        selected_list: [],
      },
      category: {
        list: [],
        selected_list: [],
      },
    },
  };

  constructor(
    injector: Injector,
    public instituteApiService: InstitutionApiService
  ) {
    super(injector);

    this.ngrx.subscribe(
      "app-generic-multi-searchable-radio-selection:post:search-list",
      async (data) => {
        const title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;

        switch (title) {
          case "institution":
            await this.getInstitutionFromElastic(this.search, 1);
            this.ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:search-list",
              this.list
            );
            break;
        }
      },
      true
    );

    this.ngrx.subscribe(
      "app-generic-multi-searchable-radio-selection:paginate:search-list",
      async (data) => {
        const title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;

        switch (title) {
          case "institution":
            await this.getInstitutionFromElastic(this.search);
            this.ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:paginate:search-list",
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
          searchText: this.searchObject.filters.location.address,
        },
        "modal-full-screen-view",
        "",
        "md"
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
  getDeadlineTypeList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Delivery Type",
          this.searchObject.filters.Deadline_type.list,
          "name",
          "generic-modal generic-medium-popup-modal",
          "",
          true,
          "Search"
        )
        .then((res) => {
          if (res.data && res.data.reset) {
            const obj = {
              data: {
                value: {
                  id: null,
                  name: null,
                },
              },
            };

            resolve(obj);
            return;
          }

          if (res.data && res.data) {
            this.searchObject.filters.Deadline_type.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });
    });
  }
  getStudyList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Study level",
          this.searchObject.filters.Level.list,
          "name",
          "generic-modal generic-large-popup-modal",
          "",
          true,
          "Search"
        )
        .then((res) => {
          if (res.data && res.data.reset) {
            const obj = {
              data: {
                value: {
                  Level_id: null,
                },
              },
            };

            resolve(obj);
            return;
          }

          if (res.data && res.data) {
            this.searchObject.filters.Level.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });

      await this.getStudyFromElastic();
      this.ngrx.publish(
        "app-generic-multi-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getStudyFromElastic(search = null, page = 1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const size = this.searchObject.filters.Level.page_size;
      const tpage = this.searchObject.filters.Level.total_pages;

      if (page > tpage) {
        resolve(false);
        return;
      }

      if (page === 1) {
        this.searchObject.filters.Level.page_number = page;
      } else {
        this.searchObject.filters.Level.page_number =
          this.searchObject.filters.Level.page_number + 1;
      }

      const res = (await this.instituteApiService.fetchAllLevels()) as any;

      if (res.data) {
        const d = res.data;

        this.searchObject.filters.Level.list = d;

        this.list = this.searchObject.filters.Level.list;
      }

      resolve(true);
    });
  }
  getStudyLevelList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise((resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Study Level",
          this.searchObject.filters.studyLevel.list,
          "name",
          "generic-modal generic-large-popup-modal",
          "",
          true,
          "Search"
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
            this.searchObject.filters.studyLevel.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });
    });
  }

  getValidityList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Validity",
          this.searchObject.filters.validity.list,
          "name",
          "generic-modal generic-large-popup-modal",
          "",
          true
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
            resolve(res.data);
          }
        });

      await this.getValidityFromElastic();
      this.ngrx.publish(
        "app-generic-multi-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getValidityFromElastic(page = 1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const size = this.searchObject.filters.validity.page_size;
      const tpage = this.searchObject.filters.validity.total_pages;

      if (page > tpage) {
        resolve(false);
        return;
      }

      if (page === 1) {
        this.searchObject.filters.validity.page_number = page;
      } else {
        this.searchObject.filters.validity.page_number =
          this.searchObject.filters.validity.page_number + 1;
      }

      const res = (await this.elasticSearch.getScholarshipValidity()) as any;
      // this.courseSearchObject.filters.institution = res.response;

      if (res.data) {
        const d = res.data;
        this.searchObject.filters.validity.page_number = 1;
        this.searchObject.filters.validity.total_count = d.data.length;
        this.searchObject.filters.validity.total_pages = 1;

        const arr = d.data.map((x, i) => {
          const obj = {
            id: i,
            name: x,
          };
          return obj;
        });

        this.searchObject.filters.validity.list = arr;

        this.list = this.searchObject.filters.validity.list;
      }

      resolve(true);
    });
  }

  getInstituionList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "institution",
          this.searchObject.filters.institution.list,
          "name",
          "generic-modal generic-large-popup-modal",
          "",
          true,
          "Search"
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
        "app-generic-multi-searchable-radio-selection:get:search-list",
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

  getScholarshipWithFilters(filterObj: any = null) {
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    return new Promise(async (resolve) => {
      const arr = [];
      if (filterObj) {
        const keys = Object.keys(filterObj);

        keys.forEach((value) => {
          const obj: any = {};
          if (filterObj[value] && filterObj[value] !== "") {
            obj[value] = filterObj[value];
          }
          arr.push(obj);
        });
      }

      const res = (await this.elasticSearch.getScholarshipWithFilters(
        1,
        10,
        this.searchObject
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
      resolve(true);
    });
  }
}

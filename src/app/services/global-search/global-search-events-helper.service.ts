import { Injectable, Injector } from '@angular/core';
import { LocationAutocompleteComponent } from 'src/app/shared';
import { GlobalSearchHelperService } from './global-search-helper.service';
import { EventsApiService } from 'yuzee-shared-lib';
@Injectable({
  providedIn: "root",
})
export class GlobalSearchEventsHelperService extends GlobalSearchHelperService {
  search = "";
  list = [];
  searchObject = {
    search_keyword: [],
    searchText: "",
    suggestedList: [],
    has_next_page: true,
    has_previous_page: false,
    page_number: 1,
    total_count: 0,
    total_pages: 0,
    list: [],
    instituteid: "",
    country_names: "",
    city_names: "",
    page_size: 5,
    funding_name_ids: "",
    min_tuition_fee: 0,
    max_tuition_fee: 44444444444,
    course_type: "",
    faculty_names: "",
    filters: {
      location: {
        address: null,
      },

      Date: [
        {
          id: 0,
          key: "Today",
          name: "Today",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
        {
          id: 1,
          key: "This Week",
          name: "This Week",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
        {
          id: 2,
          key: "This Weekend",
          name: "This Weekend ",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
        {
          id: 3,
          key: "Next Week",
          name: "Next Week ",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
        {
          id: 4,
          key: "This Month",
          name: "This Month ",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
        {
          id: 5,
          key: "This Year",
          name: "This Year ",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
      ],
      type: [
        {
          id: 0,
          key: "Online",
          name: "Online",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
        {
          id: 1,
          key: "In Person",
          name: "In Person ",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
        {
          id: 2,
          key: "My Events",
          name: "My Events ",
          src: "assets/images/lock-blue.svg",
          selected: 0,
        },
      ],
      category: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: "",
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
    },
  };

  constructor(injector: Injector, public events: EventsApiService) {
    super(injector);
    this.ngrx.subscribe(
      "app-generic-multi-searchable-radio-selection:post:search-list",
      async (data) => {
        const title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;
        switch (title) {
          case "categories":
            await this.getCategoryFromElastic();
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
          case "categories":
            await this.getCategoryFromElastic();
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
  getEventWithFilters(filterObj: any = null) {
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

      const res = (await this.elasticSearch.getEventsWithFilters(
        this.searchObject.page_number,
        this.searchObject.page_size,
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
  getDayList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .present(
          "Date",
          this.searchObject.filters.Date,
          "name",
          "generic-modal generic-medium-popup-modal",
          "",
          true
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
            this.searchObject.filters.type = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });
    });
  }
  geteventTypeList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .present(
          "Date",
          this.searchObject.filters.type,
          "name",
          "generic-modal generic-medium-popup-modal",
          "",
          true
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
            this.searchObject.filters.type = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });
    });
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

  getCategoryList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Categories",
          this.searchObject.filters.category.list,
          "event_category_name",
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
                  faculty_id: null,
                  name: null,
                },
              },
            };
            console.log("2", res);

            resolve(obj);
            return;
          }

          if (res.data && res.data) {
            resolve(res.data);
          }
        });

      await this.getCategoryFromElastic();
      this.ngrx.publish(
        "app-generic-multi-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getCategoryFromElastic(page = 1, page_size = 10) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const size = this.searchObject.filters.category.page_size;
      const tpage = this.searchObject.filters.category.total_pages;

      if (page > tpage) {
        resolve(false);
        return;
      }

      if (page === 1) {
        this.searchObject.filters.category.page_number = page;
      } else {
        this.searchObject.filters.category.page_number =
          this.searchObject.filters.category.page_number + 1;
      }

      const res = (await this.events.getEventsCategory(
        this.searchObject.filters.category.page_number,
        page_size
      )) as any;
      // this.courseSearchObject.filters.funding = res.response;
      if (res.data) {
        const d = res.data;
        this.searchObject.filters.category.page_number = d.page_number;
        this.searchObject.filters.category.total_count = d.total_count;
        this.searchObject.filters.category.total_pages = d.total_pages;

        if (page > 1) {
          this.searchObject.filters.category.list = [
            ...this.searchObject.filters.category.list,
            ...d.response,
          ];
        } else {
          this.searchObject.filters.category.list = d.response;
        }

        this.list = this.searchObject.filters.category.list;
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

  clearAll() {
    return new Promise((resolve) => {
      this.searchObject.page_number = 1;
      this.searchObject.filters.location.address = null;
      resolve(true);
    });
  }
}

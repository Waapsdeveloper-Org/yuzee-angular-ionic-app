import { Injectable, Injector } from '@angular/core';
import { DurationFilterComponent, LocationAutocompleteComponent } from 'src/app/shared';
import { GlobalSearchHelperService } from './global-search-helper.service';
import { InstitutionApiService } from 'yuzee-shared-lib';


@Injectable({
  providedIn: "root",
})
export class GlobalSearchCourseHelperService extends GlobalSearchHelperService {
  search = "";
  list = [];
  searchObject = {
    searchText: "",
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
      course: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: "",
        selected_list: [],
      },
      faculty: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: "",
        selected_list: [],
      },
      funding: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [],
        search: "",
        selected_list: [],
      },
      StudyType: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [
          {
            id: 1,
            name: "Part-Time",
            key: "Part-Time",
          },
          {
            id: 2,
            name: "Full-Time",
            key: "Full-Time",
          },
        ],
        search: "",
        selected_list: [],
      },
      delivery: {
        page_number: 1,
        page_size: 10,
        total_count: 0,
        total_pages: 99999,
        list: [
          {
            id: 1,
            name: "Online",
            key: "Online",
          },
          {
            id: 2,
            name: "Classroom Based",
            key: "Classroom Based",
          },
          {
            id: 2,
            name: "Blended",
            key: "Blended",
          },
        ],
        search: "",
        selected_list: [],
      },
      company: {
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
      pricing: {
        min_value: 0,
        max_value: 100,
        selected_min_value: 0,
        selected_max_value: 100,
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
          case "course":
            await this.getCourseFromElastic(this.search, 1);
            this.ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:search-list",
              this.list
            );
            break;
          case "faculty":
            await this.getFacultyFromElastic(this.search, 1);
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
          case "Courses":
            await this.getCoursWithFilters(this.search);
            this.ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:paginate:search-list",
              this.list
            );
            break;
          case "faculty":
            await this.getFacultyFromElastic(this.search);
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

  getCourseList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Course",
          this.searchObject.filters.course.list,
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
                  faculty_id: null,
                  name: null,
                },
              },
            };

            resolve(obj);
            return;
          }

          if (res.data && res.data) {
            this.searchObject.filters.course.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });

      await this.getCourseFromElastic();
      this.ngrx.publish(
        "app-generic-multi-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getCourseFromElastic(search = null, page = 1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const size = this.searchObject.filters.course.page_size;
      const tpage = this.searchObject.filters.course.total_pages;

      if (page > tpage) {
        resolve(false);
        return;
      }

      if (page === 1) {
        this.searchObject.filters.course.page_number = page;
      } else {
        this.searchObject.filters.course.page_number =
          this.searchObject.filters.course.page_number + 1;
      }

      let obj = null;
      if (search) {
        obj = [
          {
            course_name: search,
          },
        ];
      }

      const res = (await this.elasticSearch.getCoursesWithFilters(
        this.searchObject.filters.course.page_number,
        size,
        obj
      )) as any;
      // this.courseSearchObject.filters.institution = res.response;
      if (res.data) {
        const d = res.data;

        this.searchObject.filters.course.page_number = d.page_number;
        this.searchObject.filters.course.total_count = d.total_count;
        this.searchObject.filters.course.total_pages = d.total_pages;

        if (page > 1) {
          this.searchObject.filters.course.list = [
            ...this.searchObject.filters.course.list,
            ...d.response,
          ];
        } else {
          this.searchObject.filters.course.list = d.response;
        }

        this.list = this.searchObject.filters.course.list;
      }

      resolve(true);
    });
  }

  getFacultyList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Faculty",
          this.searchObject.filters.faculty.list,
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
                  faculty_id: null,
                  name: null,
                },
              },
            };

            resolve(obj);
            return;
          }

          if (res.data && res.data) {
            this.searchObject.filters.faculty.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });

      await this.getFacultyFromElastic();
      this.ngrx.publish(
        "app-generic-multi-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getFacultyFromElastic(search = null, page = 1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const size = this.searchObject.filters.faculty.page_size;
      const tpage = this.searchObject.filters.faculty.total_pages;

      if (page > tpage) {
        resolve(false);
        return;
      }

      if (page === 1) {
        this.searchObject.filters.faculty.page_number = page;
      } else {
        this.searchObject.filters.faculty.page_number =
          this.searchObject.filters.faculty.page_number + 1;
      }

      const res = (await this.elasticSearch.getAndSearchFaculties(
        this.searchObject.filters.faculty.page_number,
        10
      )) as any;
      if (res.data) {
        const d = res.data;
        this.searchObject.filters.faculty.page_number = d.page_number;
        this.searchObject.filters.faculty.total_count = d.total_count;
        this.searchObject.filters.faculty.total_pages = d.total_pages;

        if (page > 1) {
          this.searchObject.filters.faculty.list = [
            ...this.searchObject.filters.faculty.list,
            ...d.response,
          ];
        } else {
          this.searchObject.filters.faculty.list = d.response;
        }

        this.list = this.searchObject.filters.faculty.list;
      }

      resolve(true);
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

  getFundingList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Funding",
          this.searchObject.filters.funding.list,
          "funding_name",
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
                  funding_id: null,
                  name: null,
                },
              },
            };

            resolve(obj);
            return;
          }

          if (res.data && res.data) {
            this.searchObject.filters.funding.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });

      await this.getFundingFromElastic();
      this.ngrx.publish(
        "app-generic-multi-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getFundingFromElastic(search = null, page = 1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const size = this.searchObject.filters.funding.page_size;
      const tpage = this.searchObject.filters.funding.total_pages;

      if (page > tpage) {
        resolve(false);
        return;
      }

      if (page === 1) {
        this.searchObject.filters.funding.page_number = page;
      } else {
        this.searchObject.filters.funding.page_number =
          this.searchObject.filters.funding.page_number + 1;
      }

      const res = (await this.elasticSearch.getFundingsFromElastic(
        this.searchObject.filters.funding.page_number,
        size,
        null,
        search
      )) as any;

      if (res.data) {
        const d = res.data;
        this.searchObject.filters.funding.page_number = d.page_number;
        this.searchObject.filters.funding.total_count = d.total_count;
        this.searchObject.filters.funding.total_pages = d.total_pages;

        if (page > 1) {
          this.searchObject.filters.funding.list = [
            ...this.searchObject.filters.funding.list,
            ...d.response,
          ];
        } else {
          this.searchObject.filters.funding.list = d.response;
        }

        this.list = this.searchObject.filters.funding.list;
      }

      resolve(true);
    });
  }

  getPricing() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = this.searchObject.filters.pricing;

      const res = await this.ccModalService.present(
        DurationFilterComponent,
        { title: "Pricing", data },
        "generic-medium-popup-modal generic-modal generic-model-backdrops",
        "",
        "ios"
      );

      if (res) {
        if (res.data) {
          this.searchObject.filters.pricing = res.data;

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

  getDuration() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = this.searchObject.filters.pricing;

      const res = await this.ccModalService.present(
        DurationFilterComponent,
        { title: "Duration", data },
        "generic-medium-popup-modal generic-modal generic-model-backdrops",
        "",
        "ios"
      );

      if (res) {
        if (res.data) {
          this.searchObject.filters.pricing = res.data;

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

  getDeliveryTypeList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Delivery Type",
          this.searchObject.filters.delivery.list,
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
            this.searchObject.filters.delivery.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });
    });
  }
  getStudyTypeList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .present(
          "Study Type",
          this.searchObject.filters.StudyType.list,
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
            this.searchObject.filters.delivery.selected_list = res;
            this.searchObject.page_number = 1;
            resolve(res.data);
          }
        });
    });
  }
  getCompanyList() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];

      this.listModalService
        .multiPresent(
          "Company",
          this.searchObject.filters.company.list,
          "company_name",
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
        "app-generic-multi-searchable-radio-selection:get:search-list",
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
  getCoursWithFilters(filterObj: any = null) {
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

      const res = (await this.elasticSearch.getCoursesWithFilters(
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
      resolve(true);
    });
  }
}

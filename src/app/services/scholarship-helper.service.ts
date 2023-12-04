/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@angular/core";
import { ScholarshipApiService } from "yuzee-shared-lib";
import { NgrxService } from "./store/ngrx.service";
import { ListModalService } from "./listModal.service";
import { CcModalService } from "./cc-modal.service";
import { DeadlineDatePopupComponent } from "../scholarships";
import * as moment from "moment";

interface scholorshipSearchParams {

  entityId: string;
  levels: any;
  Sortby : string; // ['Newest to Oldest', 'Oldest to Newes'];
  validity: string; // ['ALL', 'DOMESTIC', 'INTERNATIONAL'];
  endDate: string;
  gender: string; // ['MALE', 'FEMALE'];
  languages: string;
  startDate: string;
  searchText: string;
  countries: any;
  status: string; // ['DRAFT', 'PUBLISHED', 'UNPUBLISHED'];
}

@Injectable({
  providedIn: "root",
})
export class ScholarshipHelperService {
  profileType: string = "";
  entityId = "c76212d0-9750-43be-908b-09e7d987f918";
  list = [];
  page = 1;
  totalPages = -1;
  size = 10;
  searchText = "";
  params: scholorshipSearchParams = null;
  search = "";
  apiCount = 0;
  isDisableUnpublished = false;
  nationalities: any[] = [];
  levels: any[] = [];
  statuses: any[] = [
    {
      id: 0,
      name: "Published",
      selected: true,
    },
    {
      id: 1,
      name: "Unpublished",
      selected: false,
    },
     ];

  validities: any[] = [
    {
      id: 0,
      name: "All",
      selected: false,
    },
    {
      id: 1,
      name: "Domestic",
      selected: false,
    },
    {
      id: 2,
      name: "International",
      selected: false,
    },
    {
      id: 3,
      name: "Domestic & International",
      selected: false,
    },

  ];
  Sortby: any[]= [
    {
      id: 0,
      name: "Newest to Oldest",
      selected: false,
    },
    {
      id: 1,
      name: "Oldest to Newest",
      selected: false,
    },
  ]
  isButtonVisible: boolean;

  constructor(
    private scpSrivice: ScholarshipApiService,
    private ngrx: NgrxService,
    public listModalService: ListModalService,
    public modals: CcModalService
  ) {

    this.ngrx.subscribe(
      "app-generic-searchable-radio-selection:post:search-list",
      async (data) => {
        let title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;
      }
    );
    this.ngrx.subscribe(
      "app-generic-multi-searchable-radio-selection:post:search-list",
      async (data) => {
        let title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;

        switch (title) {
          case "eligible nationalities":

            // eslint-disable-next-line no-case-declarations
            const res = this.searchLocallyInNationalities(this.search);
            ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:search-list",
              res
            );
            break;
        }
      }
    );

    this.ngrx.subscribe(
      "app-generic-searchable-radio-selection:paginate:search-list",
      async (data) => {
        let title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;

      }
    );

    this.ngrx.subscribe(
      "app-generic-multi-searchable-radio-selection:paginate:search-list",
      async (data) => {
        let title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;
      }
    );


  }

  initialize(profileType) {
    this.profileType = profileType;

    this.list = [];
    this.page = 1;
    this.searchText = null;
    this.setInitialSearchParams();
    this.getScholarshipNationalities();
    this.getScholarshiplevels();
    this.checkIfUnpublishedIsDisabled();
  }
  getScholarshipCountByEntityId() {
    throw new Error("Method not implemented.");
  }

  async checkIfUnpublishedIsDisabled() {
    let lcParams = {
      Sortby : null,
      levels: null,
      validity: null,
      startDate: null,
      endDate: null,
      gender: null,
      languages: null,
      searchText: null,
      countries: null,
      status: "UNPUBLISHED",
      entityId: this.entityId,
    };

    let data: any = Object.assign({}, lcParams);
    let arr = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let obj = {};
        if (data[key]) {
          obj[key] = data[key];
          if (key == "startDate" || key == "endDate") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            obj[key] = moment(data[key]).format("YYYY-MM-DD");
          }

          if (key == "status") {
            obj[key] = data[key].toUpperCase();
          }

          if (key == "validity") {
            obj[key] = data[key].toUpperCase();
          }

          arr.push(obj);
        }
      }
    }

    const res =
      (await this.scpSrivice.getPaginatedScholarshipBasedOnEntityAndType(
        this.entityId,
        1,
        this.size,
        "",
        arr
      )) as any;


    if (res.status == 200) {
      if (res.data) {
        let d = res.data;
        let lcList = Object.assign([], d.response);
        this.isDisableUnpublished = lcList.length == 0;
      }
    }
  }

  setInitialSearchParams() {
    this.params = {
      levels: null,
      validity: null,
      Sortby: null,
      startDate: null,
      endDate: null,
      gender: null,
      languages: null,
      searchText: null,
      countries: null,
      status: "Published",
      entityId: this.entityId,
    };
  }

  setIdealParams(data) {
    let obj: scholorshipSearchParams = {
      levels: data.levels.length ? data.levels : this.params.levels,
      validity: data.validity ? data.validity : this.params.validity,
      Sortby: data.Sortby ? data.Sortby : this.params.Sortby,
      startDate: data.startDate ? data.startDate : this.params.startDate,
      endDate: data.endDate ? data.endDate : this.params.endDate,
      gender: data.gender ? data.gender : this.params.gender,
      languages: data.languages ? data.languages : this.params.languages,
      searchText: data.searchText ? data.searchText : this.params.searchText,
      countries: data.countries ? data.countries : this.params.countries,
      status: data.status ? data.status : this.params.status,
      entityId: this.entityId,
    };

    this.params = obj;
  }

  getScholarshipCount(): Promise<any> {
    if (!this.entityId) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.scpSrivice.getScholarshipCountByEntityId(
        this.entityId,
        this.profileType,
        this.params.status.toUpperCase()
      )) as any;


      if (res.data) {
        this.apiCount = res.data.count;
      }

      resolve(res);
    });
  }

  async getPaginatedScholarshipBasedOnEntityAndType() {
    let data: any = Object.assign({}, this.params);
    let arr = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let obj = {};
        if (data[key]) {
          obj[key] = data[key];
          if (key == "startDate" || key == "endDate") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            obj[key] = moment(data[key]).format("YYYY-MM-DD");
          }

          if (key == "status") {
            obj[key] = data[key].toUpperCase();
          }

          if (key == "validity") {
            obj[key] = data[key].toUpperCase();
          }

          arr.push(obj);
        }
      }
    }


    const res =
      (await this.scpSrivice.getPaginatedScholarshipBasedOnEntityAndType(
        this.entityId,
        this.page,
        this.size,
        this.searchText,
        arr
      )) as any;


    if (res.status == 200) {
      if (res.data) {
        let d = res.data;
        this.page = d.page_number;
        this.list = Object.assign([], d.response);

        this.totalPages = d.total_pages;
      }
    }

    this.getScholarshipCount();
  }

  async getScholarshipSearch(search) {

    this.params.searchText = search;
    this.getPaginatedScholarshipBasedOnEntityAndType();
  }

  getScholarshipNationalities(): Promise<any> {
    if (!this.entityId) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.scpSrivice.getScholarshipNationalities(
        this.entityId,
        this.profileType,
        this.params.status.toUpperCase()
      )) as any;

      if (res.data) {
        this.nationalities = res.data.map((x, i) => {
          let obj = {
            id: i,
            name: x,
            selected: false,
          };
          return obj;
        });
      }

      resolve(res);
    });
  }

  searchLocallyInNationalities(search){
    return this.nationalities.filter( obj => obj.name.includes(search));
  }

  getScholarshiplevels(): Promise<any> {
    if (!this.entityId) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.scpSrivice.getScholarshipLevels(
        this.entityId,
        this.profileType
      )) as any;

      if (res.data) {
        this.levels = res.data.map((x, i) => {
          let obj = {
            id: i,
            name: x,
            selected: false,
          };
          return obj;
        });
      }

      resolve(res);
    });
  }

  filterScholarshipBySearch() {}

  filterScholarshipNationalities() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const selected = this.nationalities
        .filter((x) => x.selected == true)
        .map((x) => x.id);

      this.listModalService
        .multiPresent(
          "Eligible Nationalities",
          this.nationalities,
          "name",
          "generic-medium-popup-modal generic-modal generic-model-backdrops",
          null,
          true,
          "Search",
          selected
        )
        .then((res) => {

          if (res.data) {
            this.nationalities = this.nationalities.map((obj) => {
              let selectedIndex = res.data.findIndex((x) => x.id == obj.id);
              obj.selected = selectedIndex != -1;
              return obj;
            });



            this.params.countries = this.nationalities
              .filter((x) => x.selected == true)
              .map((x) => x.name)
              .join();
            this.getPaginatedScholarshipBasedOnEntityAndType();

            resolve(res.data);
          }
        });
    });
  }

  filterScholarshipStatusIsActive() {
    return this.params.status != null && this.params.status != "";
  }
  filterScholarshipNationalitiesIsActive() {
    return this.params.countries != null && this.params.countries != "";
  }
  filterScholarshiplevelsIsActive() {
    return this.params.levels != null && this.params.levels != "";
  }
  filterScholarshipValidityIsActive() {
    return this.params.validity != null && this.params.validity != "";
  }
  filterScholarshipDeadlineIsActive() {
    return this.params.startDate != null && this.params.startDate != "";
  }
  filterScholarshipSortbyIsActive() {
    return this.params.Sortby != null && this.params.Sortby != "";
  }
  IsClearAll() {
    return (
      this.filterScholarshipStatusIsActive() &&
      this.filterScholarshipNationalitiesIsActive() &&
      this.filterScholarshiplevelsIsActive() &&
      this.filterScholarshipValidityIsActive() &&
      this.filterScholarshipDeadlineIsActive() &&
      this.filterScholarshipSortbyIsActive()
    );
  }

  filterScholarshipStatus() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {

      const selected = this.statuses.find((x) => x.selected == true);



      let indices = this.isDisableUnpublished ? [1] : [];

      this.listModalService
        .present(
          "Visibility",
          this.statuses,
          "name",
          "generic-small-popup-modal-without generic-modal generic-model-backdrops",
          "",
          false,
          true,
          "Search ...",
          selected ? selected.name : null,
          indices
        )
        .then((res) => {

          if (res.data && res.data.value) {
            let v = res.data.value;
            this.statuses = this.statuses.map((obj) => {
              obj.selected = v.id == obj.id;
              return obj;
            });

            let found = this.statuses.find((x) => x.selected == true);
            this.params.status = found ? found.name : null;
            this.getPaginatedScholarshipBasedOnEntityAndType();

            resolve(res.data);
          }
        });
    });
  }

  filterScholarshipValidity() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {

      const selected = this.validities.find((x) => x.selected == true);
      this.listModalService
        .present(
          "Validity",
          this.validities,
          "name",
          "generic-small-popup-modal-without generic-modal generic-model-backdrops",
          "",
          false,
          false,
          "Search ...",
          selected ? selected.name : null
        )
        .then((res) => {

          if (res.data && res.data.value) {
            let v = res.data.value;


            this.validities = this.validities.map((obj) => {
              obj.selected = v.id == obj.id;
              return obj;
            });



            let found = this.validities.find((x) => x.selected == true);
            this.params.validity = found ? found.name : null;
            this.getPaginatedScholarshipBasedOnEntityAndType();






            resolve(res.data);
          }
        });
    });
  }
  filterScholarshipSortby() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {

      const selected = this.Sortby.find((x) => x.selected == true);



      this.listModalService
        .present(
          "Sort by",
          this.Sortby,
          "name",
          "generic-small-popup-modal generic-modal generic-model-backdrops",
          "",
          false,
          false,
          "Search ...",
          selected ? selected.name : null
        )
        .then((res) => {

          if (res.data && res.data.value) {
            let v = res.data.value;


            this.Sortby = this.Sortby.map((obj) => {
              obj.selected = v.id == obj.id;
              return obj;
            });



            let found = this.Sortby.find((x) => x.selected == true);
            this.params.Sortby = found ? found.name : null;
            this.getPaginatedScholarshipBasedOnEntityAndType();






            resolve(res.data);
          }
        });
    });
  }

  filterScholarshiplevels() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor, @typescript-eslint/require-await
    return new Promise(async (resolve) => {

      const selected = this.levels
        .filter((x) => x.selected == true)
        .map((x) => x.id);

      this.listModalService
        .multiPresent(
          "Study Level",
          this.levels,
          "name",
          "generic-medium-popup-modal generic-modal generic-model-backdrops",
          null,
          true,
          "Search",
          selected
        )
        .then((res) => {

          if (res.data) {
            this.levels = this.levels.map((obj) => {
              let selectedIndex = res.data.findIndex((x) => x.id == obj.id);
              obj.selected = selectedIndex != -1;
              return obj;
            });



            this.params.levels = this.nationalities
              .filter((x) => x.selected == true)
              .map((x) => x.name)
              .join();
            this.getPaginatedScholarshipBasedOnEntityAndType();

            resolve(res.data);
          }
        });
    });
  }

  async filterScholarshipDeadline() {
    const res = await this.modals.present(
      DeadlineDatePopupComponent,
      {
        startDate: this.params.startDate,
        endDate: this.params.endDate,
      },
      "generic-small-popup-modal generic-modal generic-model-backdrops"
    );


    if (res.data) {
      this.params.startDate = res.data.startDate;
      this.params.endDate = res.data.endDate;

      this.getPaginatedScholarshipBasedOnEntityAndType();
    }
  }
  clearAllFilters() {
    this.setInitialSearchParams();
    this.getPaginatedScholarshipBasedOnEntityAndType();
  }

  getScholarshipByIdBasedOnEntityAndEntityType(entityId, scholarshipId) {
    return new Promise((resolve) => {

      this.scpSrivice
        .getScholarshipByIdBasedOnEntityAndEntityType(
          entityId,
          this.profileType,
          scholarshipId
        )
        .then(
          (res: any) => {
            resolve(res);

            if (res.status == 200) {
            }
          },
          (err) => {

            resolve(null);
          }
        )
        .catch((c) => {

          resolve(null);
        });
    });
  }
}

import { Injectable } from "@angular/core";
import { NgrxService } from "./store/ngrx.service";
import {
  CommonApiService,
  CompanyApiService,
  ElasticSearchApiService,
  InternshipProgramService,
  JobsApiService,
} from "yuzee-shared-lib";
import { ListModalService } from "./listModal.service";
import { CONTACTS_LIST_ARRAY } from "../app.constants";
import { CcStringService } from "./cc-string.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CompanyHelperService {
  multiPresent(): any {
    throw new Error('Method not implemented.');
  }
  companyId = "ea7bef7d-f347-4957-affd-8069bef29aec";
  search = "";
  industryTypes: any[] = [];
  companyTypes: any[] = [];
  companySpecialities: any[] = [];
  commonKeywords: any[] = [];
  selectedIndustryId = "";
  selectedCompanyId;
  selectedSpecialitiesIds: any[] = [];
  selectedKeywordIds: any[] = [];
  contacts: any[] = [];
  createCompany = {
    privacy_level: "PUBLIC",
    company_type: "",
    company_sub_type: "JOB_SEARCH_AGENCY",
    company_name: "",
    tag_line: "",
    description: "",
    public_url: "",
    industry: "",
    industry_type: "",
    year_founded: "",
    speciality: [],
    profilePhoto: "",
    websiteUrl: "",
    working_hours: [],
    industry_id: "",
    provider_codes: [],
    location: {
      privacy_level: "PRIVATE",
      campus_name: "N/A",
      city_name: "N/A",
      state_name: "N/A",
      country_name: "N/A",
      postal_code: "0000",
      address: "N/A",
      latitude: -3.747333,
      longitude: -9.885676,
      is_primary: true,
      contact_details: [
        {
          key: "EMAIL",
          value: "",
        },
        {
          key: "PHONE",
          value: "",
        },
      ],
      contact_working_hours: [
        {
          day_of_week: "",
          is_off_day: false,
          open_at: "",
          close_at: "",
        },
        {
          day_of_week: "",
          is_off_day: false,
          open_at: "",
          close_at: "",
        },
      ],
      timings: [],
    },
  };

  /*
   * this size and page is for
   */
  size = 10;
  page_number = 1;
  total_pages: number = 1000000000;
  list = [];

  companies = [];
  companyUrl: any;
  apiService: any;
  postEditCompanySteptwo: any;
  getjobs: any;

  constructor(
    private ngrx: NgrxService,

    public listModalService: ListModalService,
    private api: CompanyApiService,
    private companyAPI: CompanyApiService,
    private common: CommonApiService,
    private strings: CcStringService,
    private job: JobsApiService,
    private elasticSearchApiService: ElasticSearchApiService,
    private router: Router,
    private internshipService: InternshipProgramService,

  ) {
    this.initialize();

    this.ngrx.subscribe(
      "app-generic-searchable-radio-selection:post:search-list",
      async (data) => {
        let title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;
        switch (title) {
          case "industry":
            this.total_pages = 999999;
            await this.getIndustries(this.search, 1).then(() => {
              this.ngrx.publish(
                "app-generic-searchable-radio-selection:get:search-list",
                this.list
              );
            });
            break;
        }
      }
    );
    this.ngrx.subscribe(
      "app-generic-multi-searchable-radio-selection:post:search-list",
      async (data) => {
        let title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;
        switch (title) {
          case "speciality":
            await this.getSpecialities(this.search, 1);
            ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:search-list",
              this.list
            );
            break;
          case "keywords":
            await this.getKeywords(this.search, 1);
            ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:search-list",
              this.list
            );
            break;
          case "industry":
            this.total_pages = 999999;
            await this.getIndustries(this.search, 1).then(() => {
              this.ngrx.publish(
                "app-generic-multi-searchable-radio-selection:get:search-list",
                this.list
              );
            });
            break;
        }
      }
    );

    this.ngrx.subscribe(
      "app-generic-searchable-radio-selection:paginate:search-list",
      async (data) => {
        let title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;
        switch (title) {
          case "industry":
            await this.getIndustries(this.search);
            ngrx.publish(
              "app-generic-searchable-radio-selection:get:paginate:search-list",
              this.list
            );
            break;
        }
      }
    );

    this.ngrx.subscribe(
      "app-generic-multi-searchable-radio-selection:paginate:search-list",
      async (data) => {
        let title = data.title ? data.title.toLowerCase() : "";
        this.search = data.search;

        switch (title) {
          case "speciality":
            await this.getSpecialities(this.search);
            ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:paginate:search-list",
              this.list
            );
            break;
          case "keywords":
            await this.getKeywords(this.search);
            ngrx.publish(
              "app-generic-multi-searchable-radio-selection:get:paginate:search-list",
              this.list
            );
            break;
        }
      }
    );

    this.ngrx.subscribe("app-profile-contact-details:data-update", (data) => {
      // post data to update on api
      if (data.data && data.profileType == "COMPANY") {
        this.setCompanyContactDetails(data.data);
      }
    });
  }

  async initialize() {
    await this.getIndustryTypes();
    await this.getCompanyType();
    await this.getSpecialities();
    await this.getKeywords();
  }

  paginateSearchCompanyByName() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.api.searchCompanyByName(
        this.search,
        1,
        8000
      )) as any;

      if (res.data) {
        this.list = res.data.response;
      }

      resolve(this.list);
    });
  }

  async searchCompanyByName() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];
      const selected = this.companies.find(
        (x) => x.company_id == this.selectedCompanyId
      );

      this.listModalService
        .present(
          "Companies",
          this.companies,
          "company_name",
          "generic-medium-popup-modal generic-modal generic-model-backdrops",
          "fullscreen",
          true,
          true,
          "Search",
          selected
        )
        .then((res) => {
          if (res.data && res.data.value) {
            localStorage.setItem(
              "company_id",
              res.data.value.company_id as string
            );
            this.router.navigate(["company-profile"]);
          }

          resolve(res.data);
        });

      await this.paginateSearchCompanyByName();
      this.ngrx.publish(
        "app-generic-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getIndustryTypes() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.api.getIndustries("", 1, 10)) as any;
      this.industryTypes = res.response;

      if (this.industryTypes.length > 0) {
        this.selectedIndustryId = this.industryTypes[0].industry_id;
      }

      resolve(true);
    });
  }

  getSpecialitiesTypes() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.api.getSpecialities(
        this.selectedIndustryId,
        "",
        1,
        10
      )) as any;
      this.companySpecialities = res.response;
      resolve(true);
    });
  }

  getCompanyType() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.api.getCompanyType()) as [];
      this.companyTypes = res.map((item, index) => ({
        company_id: index + 1,
        company_name: item,
      }));
      resolve(true);
    });
  }

  selectCompany() {
    return new Promise((resolve) => {
      this.search = "";
      this.list = [];
      const selected = this.companyTypes.find(
        (x) => x.company_id == this.selectedCompanyId
      );

      this.listModalService
        .present(
          "Type",
          this.companyTypes,
          "company_name",
          "generic-medium-popup-modal generic-modal generic-model-backdrops",
          "",
          false,
          true,
          "Search",
          selected
        )
        .then((res) => {
          if (res.data && res.data.reset) {
            let obj = {
              data: {
                value: {
                  company_id: null,
                  company_name: null,
                },
              },
            };

            resolve(obj);
            return;
          }

          if (res.data && res.data.value) {
            this.createCompany.company_type = res.data.value.company_name;
            this.selectedCompanyId = res.data.value.company_id;
            resolve(res);
          }
        });
    });
  }
  // 123
  selectMultiCompanyType() {
    return new Promise((resolve) => {
      this.search = "";
      this.list = [];
      const selected = this.companyTypes.find(
        (x) => x.company_id == this.selectedCompanyId
      );

      this.listModalService.multiPresent(
        "Type",
        this.companyTypes,
        "company_name",
        "generic-medium-popup-modal generic-modal generic-model-backdrops",
        "",
        false,
        "Search",
      )
        .then((res) => {
          if (res.data && res.data.reset) {
            this.clearMultiSelectedCompanyTypes();
            resolve([]);
            return;
          }

          if (res.data && res.data) {

            resolve(res.data);
          }
        });
    });
  }

  clearMultiSelectedCompanyTypes(){
    this.companyTypes = this.companyTypes.map( x => {
      x.isActive = false
      return x;
    })
  }
  clearMultiSelectedCompanyindustry(){
    this.industryTypes = this.industryTypes.map( x => {
      x.isActive = false
      return x;
    })
  }

  // list of apis to call
  getIndustries(search = "", page = -1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      if (this.page_number > this.total_pages) {
        resolve(false);
        return;
      }

      if (page == 1) {
        this.page_number = page;
      } else {
        this.page_number = this.page_number + 1;
      }

      const res = (await this.api.getIndustries(
        search,
        this.page_number,
        this.size
      )) as any;
      if (page == 1) {
        this.list = res.response;
      } else {
        this.list = /* this.list.concat( */ res.response /* ) */;
      }

      this.page_number = res.page_number;
      this.total_pages = res.total_pages;

      resolve(true);
    });
  }
  // 111
  selectIndustry() {
    return new Promise((resolve) => {
      this.search = "";
      this.list = [];
      const selected = this.industryTypes.find(
        (x) => x.industry_id == this.selectedIndustryId
      );

      this.listModalService
        .present(
          "Industry",
          this.industryTypes,
          "industry_name",
          "",
          "fullscreen",
          true,
          true,
          "Search",
          selected
        )
        .then((res) => {
          if (res.data && res.data.reset) {
            let obj = {
              data: {
                value: {
                  industry_id: null,
                  industry_name: null,
                },
              },
            };

            resolve(obj);
            return;
          }

          if (res.data && res.data.value) {
            this.createCompany.industry = res.data.value.industry_name;
            this.selectedIndustryId = res.data.value.industry_id;
            resolve(res);
          }
        });
    });
  }
  selectIndustryMultipe(){
    return new Promise((resolve) => {
      this.search = "";
      this.list = [];
     

      this.listModalService
        .multiPresent(
          "Industry",
          this.industryTypes,
          "industry_name",
          "generic-modal generic-large-popup-modal",
          "",
          true,
         "Search",
        )
        .then((res) => {
          if (res.data && res.data.reset) {
            let obj = {
              data: {
                value: {
                  industry_id: null,
                  industry_name: null,
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
    });
  }

  getSpecialities(search = "", page = -1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      if (this.page_number > this.total_pages) {
        resolve(false);
        return;
      }

      if (page == 1) {
        this.page_number = page;
      } else {
        this.page_number = this.page_number + 1;
      }

      const res = (await this.api.getSpecialities(
        this.selectedIndustryId,
        search,
        this.page_number,
        25
      )) as any;
      if (page == 1) {
        this.list = res.response;
      } else {
        this.list = /* this.list.concat( */ res.response /* ) */;
      }

      this.page_number = res.page_number;
      this.total_pages = res.total_pages;

      resolve(true);
    });
  }
  selectSpecialities() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];
      const selected = this.createCompany.speciality;

      this.listModalService
        .multiPresent(
          "Speciality",
          this.companySpecialities,
          "speciality_name",
          "",
          "fullscreen",
          true,
          "Search",
          selected
        )
        .then((res) => {
          if (res.data) {
            this.createCompany.speciality = res.data;
            resolve(res.data);
          }
        });

      await this.getSpecialities("", 1);
      this.ngrx.publish(
        "app-generic-multi-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getKeywords(search = "", page = -1) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      if (this.page_number > this.total_pages) {
        resolve(false);
        return;
      }

      if (page == 1) {
        this.page_number = page;
      } else {
        this.page_number = this.page_number + 1;
      }

      const res = (await this.common.getKeywordBySearch(
        this.page_number,
        25,
        search
      )) as any;

      if (page == 1) {
        this.list = res.response;
      } else {
        this.list = /* this.list.concat( */ res.response /* ) */;
      }

      this.page_number = res.page_number;
      this.total_pages = res.total_pages;

      resolve(true);
    });
  }

  selectKeywords(selectedKeywordIds) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      this.search = "";
      this.list = [];
      const selected = selectedKeywordIds.map((x) => ({
        keyword: x,
      }));

      this.listModalService
        .multiPresent(
          "keywords",
          [],
          "keyword",
          "",
          "fullscreen",
          true,
          "Search",
          selected
        )
        .then((res) => {
          if (res.data) {
            this.selectedKeywordIds = res.data;
            resolve(res.data);
          }
        });

      await this.getKeywords("", 1);
      this.ngrx.publish(
        "app-generic-multi-searchable-radio-selection:get:search-list",
        this.list
      );
    });
  }

  getCompanyContactDetails() {
    this.common.getContactDetails("COMPANY", this.companyId).then((res: any) => {
      this.contacts = res.data.response.map((item) => {
        const str = this.strings.getReverseFormattedUnderscoreValue(
          item.contact_type
        );
        let clItem = CONTACTS_LIST_ARRAY.find((x) => x.contact_type == str);
        let obj = { ...item, ...clItem };
        return obj;
      });

      this.ngrx.publish("app-profile-contact-details:data-update", {
        data: this.contacts,
        profileType: "COMPANY",
      });
    });
  }

  setCompanyContactDetails(data) {
    let customArray = [];
    data.forEach(element => {
      let param = {
        contact_detail_id: element.id ?? null,
        contact_type: element.contact_type.toUpperCase(),
        icon: element.icon ?? null,
        value: element.value,
        privacy_level: "PUBLIC",
        dial_code: element.dial_code ?? "",
      }
      customArray.push(param);
    });
    this.common.updateContactDetails("COMPANY", this.companyId, customArray);
  }

  getCompanyFaqList() {
    this.common
      .getFaqListUsingSearch({
        pageNumber: 1,
        pageSize: 10,
        entityId: this.companyId,
        entityType: "COMPANY",
        keyword: "",
      })
      .then((res: any) => {
        this.ngrx.publish("app-profile-faq-list:data-update", {
          data: res.response,
        });
      });
  }

  getCompanyPartnersSearch(
    type: string,
    search: string,
    page = 1,
    size = 5000
  ) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      let api = null;

      if (type == "company") {
        api = await this.api.searchCompanyByName(search, page, size);
      } else {
        api = await this.elasticSearchApiService.searchInstituteByString(
          search
        );
      }

      let res = api;
      let arr = [];
      if (res?.data?.response) {
        arr = res?.data?.response;
      }

      resolve(arr);
    });
  }

  editCompanyProfileStepTwo(editCompany: any) {
    const stepTwoObj = {
      company_name: editCompany.company_name,
      tag_line: editCompany.tag_line,
      description: editCompany.description,
      company_type: editCompany.company_type,
      industry_id: editCompany.industry_id,
      industry_type: editCompany.industry_type,
      year_founded: editCompany.year_founded,
      speciality: editCompany.speciality,
    };

    return this.api.postEditCompanySteptwo(this.companyId, stepTwoObj);
  }

  editCompanyProfileStepOne(editCompany: any) {
    const stepTwoObj = {
      company_name: editCompany.company_name,
      tag_line: editCompany.tag_line,
      description: editCompany.description,
      industry_id: editCompany.industry_id,
    };

    return this.api.addUpdateCompanyProfile(this.companyId, stepTwoObj);
  }


  addStaffItem(data: {
    title: string;
    description: string;
    taged_interviewee: any[];
  }) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      let d = Object.assign(data, {}) as any;
      d.name = data.title;

      const res = (await this.api.postCompanyStaffInterview(
        this.companyId,
        data
      )) as any;

      if (res.data) {
        let obj = Object.assign(res.data, {});
        resolve(obj);
        return;
      }
      resolve(null);
    });
  }

  editStaffItem(
    id,
    data: { title: string; description: string; taged_interviewee: any[] }
  ) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      let d = Object.assign(data, {}) as any;
      d.name = data.title;

      const res = (await this.api.updateCompanyInterview(
        data,
        this.companyId,
        id
      )) as any;

      if (res.data) {
        let obj = Object.assign(res.data, {});
        resolve(obj);
        return;
      }
      resolve(null);
    });
  }

  getStaffItem() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.api.getCompanyStaffInterview(
        this.companyId
      )) as any;
      if (res.data && res.data.response) {
        let list = res.data.response;
        resolve(list);
      }
    });
  }

  deleteStaffItem(interviewId: any) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor, @typescript-eslint/require-await
    return new Promise(async (resolve) => {
      const res = await this.api.deleteCompanyInterview(
        this.companyId,
        interviewId
      );
      if (res) {
        resolve(res);
      }
    });
  }

  getAllCompanyMedia(pageNumber: number, pageSize: number) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor, @typescript-eslint/require-await
    return new Promise(async (resolve) => {
      this.api
        .getAllCompanyMedia(this.companyId, pageNumber, pageSize)
        .then((res: any) => {
          if (res.data.response.length > 0) {
            let data = res.data.response;
            resolve(data);
          } else {
            resolve([]);
          }
        });
    });
  }

  getAllCareerAdvice(pageNumber: number, pageSize: number) {
    return new Promise((resolve) => {
      this.api
        .getCareerAdviceList(this.companyId, pageNumber, pageSize)
        .then((res: any) => {
          if (res.data.response.length > 0) {
            let data = res.data.response;
            resolve(data);
          } else {
            resolve([]);
          }
        });
    });
  }

  getCompanyAchievement() {
    return new Promise((resolve) => {
      this.api
        .getCompanyAchievement(this.companyId, 1, 500)
        .then((res: any) => {
          resolve(res);
        });
    });
  }
  postCompanyInternship() {
    return new Promise((resolve) => {
      this.api.postCompanyInternship(this.companyId, 1).then((res: any) => {
        resolve(res);
      });
    });
  }
  getCompanyInternship() {
    return new Promise((resolve) => {
      this.api.getCompanyInternship(this.companyId, 1, 100).then((res: any) => {
        resolve(res);
      });
    });
  }
  getAllInternShip(pageNumber: number, pageSize: number) {
    return new Promise((resolve) => {
      this.internshipService
        .getInternshipPaginated(this.companyId, 'COMPANY', pageNumber, pageSize)
        .then((res: any) => {
          if (res.data.response.length > 0) {
            let data = res.data.response;
            resolve(data);
          } else {
            resolve([]);
          }
        });
    });
  }

  getIntroductoryVideosInternshipProgram(id, obj) {

    return new Promise((resolve) => {
      this.common
        .getAboutMe("job-service", "job", id, "internshipAboutMe", obj)
        .then((res: any) => {

          if (res.data.response.length > 0) {
            let data = res.data.response;
            resolve(data);
          } else {
            resolve([]);
          }
        }, err => {

        });
    });
  }

  writeReviewPost(pageNumber: number, pageSize: number) {
    return new Promise((resolve) => {
      // Required Shoaib need this makes error
      //this.job
      //   .getJobs(this.companyId, pageNumber, pageSize)
      //   .then((res: any) => {
      //     if (res.data.response.length > 0) {
      //       let data = res.data.response;
      //       resolve(data);
      //     } else {
      //       resolve([]);
      //     }
      //   });
    });
  }

  addUpdateCompanyAbnVarification(abn_registration_number) {
    return new Promise((resolve) => {
      this.companyAPI
        .addUpdateCompanyAbnVarification(this.companyId, abn_registration_number)
        .then((res: any) => {
          if (res) {
            let data = res;
            resolve(data);
          } else {
            resolve([]);
          }
        });
    });
  }
}

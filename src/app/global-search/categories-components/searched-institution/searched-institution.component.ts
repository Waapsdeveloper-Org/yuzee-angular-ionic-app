
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { searchInstitutionFilterArray } from 'src/app/app.constants';
import { NgrxService } from 'src/app/services/store/ngrx.service';
import { GlobalSearchInstituteHelperService } from 'src/app/services/global-search/global-search-institute-helper.service';
// =======
// import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import { IonContent, ModalController } from "@ionic/angular";
// import { DurationFilterComponent } from "../../pop-ups/duration-filter/duration-filter.component";
// import { GlobalSearchHelperService } from "src/app/services/global-search-helper.service";
// import { searchInstitutionFilterArray } from "src/app/app.constants";
// import { CcModalService } from "src/app/services/cc-modal.service";
// import { LocationAutocompleteComponent } from "src/app/shared";
// import { ListModalService } from "src/app/services/listModal.service";
// import { NgrxService } from "src/app/services/store/ngrx.service";
// import { OpenMapInstitutionsComponent } from "../../pop-ups/open-map-institutions/open-map-institutions.component";
// >>>>>>> master

@Component({
  selector: 'app-searched-institution',
  templateUrl: './searched-institution.component.html',
  styleUrls: ['./searched-institution.component.scss'],
})
export class SearchedInstitutionComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  filterArray = searchInstitutionFilterArray;
  list = [];
  step = 1;
  filterObj = {
    city_name: null,
    country_name: null,
    elastic_type: 'INSTITUTE',
    institute_affiliaction_type: null,
    institute_types: null,
    max_world_ranking: null,
    min_world_ranking: 0,
    search_keyword: '',
    state_name: null,
  };

  constructor(
    public gsHelper: GlobalSearchInstituteHelperService,
    public ngrx: NgrxService
  ) {
    this.ngrx.subscribe(
      'global-search-institute-slides-end',
      this.slidesEndsHorizontal.bind(this)
    );
  }

  ngOnInit() {
    this.getInstitutionWithFilters();
  }

  ionViewWillEnter() {
    this.getInstitutionWithFilters();
  }

  getInstitutionWithFilters() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = (await this.gsHelper.getInstitutionWithFilters(
        this.filterObj
      )) as any[];
      const page = this.gsHelper.searchObject.page_number;
      if (page > 1) {
        this.list = [...this.list, ...data];
      } else {
        this.list = [...data];
      }

      this.ngrx.publish('global-search-institution', this.list);
      resolve(data);
    });
  }

  openFilter($event) {
    const filter = $event;

    switch (filter.name) {
      case 'Location':
        this.processLocationFilter(filter);
        break;
      case 'Type':
        this.processTypeFilter(filter);
        break;
      case 'World Ranking':
        this.processRankingFilter(filter);
        break;
      case 'Category':
        this.processCategoryFilter(filter);
        break;
    }
  }

  async processLocationFilter(filter) {
    const res = (await this.gsHelper.getLocation()) as any;
    if (res) {
      filter.active = true;
      this.filterObj.city_name = res.City;
      this.filterObj.country_name = res.Country;
      this.filterObj.state_name = res.State;
      this.getInstitutionWithFilters();
    }
  }

  async processTypeFilter(filter) {
    const res = (await this.gsHelper.getTypeList()) as any;
    filter.active = res != null;
    this.filterObj.institute_affiliaction_type = res;
    this.getInstitutionWithFilters();
  }

  async processRankingFilter(filter) {
    const res = (await this.gsHelper.getRanking()) as any;
    filter.active = res.selected_max_value != null;
    this.filterObj.min_world_ranking = res.selected_min_value;
    this.filterObj.max_world_ranking = res.selected_max_value;
    this.getInstitutionWithFilters();
  }

  async processCategoryFilter(filter) {
    const res = (await this.gsHelper.getCategoryList()) as any;
    filter.active = res.length > 0;
    this.filterObj.institute_types =
      res.length > 0 ? res.map((x) => x.key) : null;

    const index = this.filterArray.findIndex((x) => x.name === 'Category');

    if (index !== -1) {
      this.filterArray[index].count = this.filterObj.institute_types.length;
    }
    this.getInstitutionWithFilters();
  }

  openMap() {
    this.step = this.step === 1 ? 2 : 1;
  }

  async slidesEndsHorizontal() {
    this.gsHelper.searchObject.page_number += 1;
    await this.getInstitutionWithFilters();
  }

  async clearAll() {
    await this.gsHelper.clearAll();
    this.filterObj = {
      city_name: null,
      country_name: null,
      elastic_type: 'INSTITUTE',
      institute_affiliaction_type: null,
      institute_types: [],
      max_world_ranking: null,
      min_world_ranking: 0,
      search_keyword: '',
      state_name: null,
    };

    const index = this.filterArray.findIndex((x) => x.name === 'Category');
    if (index !== -1) {
      this.filterArray[index].count = 0;
    }

    const bindex = this.filterArray.findIndex((x) => x.name === 'Type');
    if (bindex !== -1) {
      this.filterArray[bindex].count = 0;
    }

    this.filterArray = this.filterArray.map((x) => {
      x.active = false;
      return x;
    });

    this.getInstitutionWithFilters();
  }

  async onIonInfinite($event) {
    if (
      this.gsHelper.searchObject.page_number <
      this.gsHelper.searchObject.total_pages
    ) {
      this.gsHelper.searchObject.page_number += 1;
      await this.getInstitutionWithFilters();
    }
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }
}

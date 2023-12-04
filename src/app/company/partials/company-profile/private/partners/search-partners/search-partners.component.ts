import { Component, Injector, Input, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { CompanyHelperService } from "src/app/services/company-helper.service";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { ElasticSearchApiService } from "yuzee-shared-lib";

@Component({
  selector: "app-search-partners",
  templateUrl: "./search-partners.component.html",
  styleUrls: ["./search-partners.component.scss"],
})
export class SearchPartnersComponent extends CcBasePage implements OnInit {
  placeholder = 'Search';
  partnerInstitutes: any[] = [];
  partnerCompanies: any[] = [];
  partners: any[] = [];
  _selected_data = [];
  selection = [];
  search = "";
  pageNumber = 1;
  pageSize = 10;
  limit = 1;
  changed: boolean = false;
  selectedTab: string = "Company";
  isEmpty: boolean = false;
  showDoneBtn = false;
  constructor(
    injector: Injector,
    private ccHelperService: CompanyHelperService,
    private elastic: ElasticSearchApiService,
    private navParams: NavParams
  ) {
    super(injector);
  }

  @Input()
  public get selected_data() {
    // eslint-disable-next-line no-underscore-dangle
    return this._selected_data;
  }

  public set selected_data(value: any[]) {
    if (value.length > 0) {
      this.partners = [].concat(value);
      this.selection = [].concat(value);
      // eslint-disable-next-line no-underscore-dangle
      this._selected_data = value;
    }
  }

  ngOnInit() {
  this.placeholder = this.navParams.get('placeholder');
  }

  onSearch($event){
    let v = this.handleStringError($event) as string;
    this.search = v;
    this.startSearch(true, true)
  }

  async startSearch(paginate = false, isInit = false) {
    let res;
    res = await this.ccHelperService.getCompanyPartnersSearch(this.selectedTab, this.search);
    const value = res;
    if (this.pageNumber == 1 && value.length == 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
    if (value.length !== 10) {
      this.limit = -1;
    }
    if (!paginate) {
      this.partners = [].concat(value);
    } else if (paginate) {
      this.partners = this.partners.concat(value);
    }
  }

  loadMore($event) {
    if (this.limit !== -1) {
      this.pageNumber++;
      this.startSearch(true);
    }
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }

  ionSearch($event) {
    this.pageNumber = 1;
    this.limit = 1;
    this.search = $event.target.value;
    this.startSearch();
  }

  dismiss(data) {
    this.ccModalService.dismiss(data);
  }

  getSelectedLength() {
    return this.selection.length == 0 ? true : false;
  }

  save() {
    this.ccModalService.dismiss({
      selected: this.selection,
      changed: this.changed,
    });
  }

  pushSelectedPartner(item) {
    this.changed = true;
    this.showDoneBtn = true;
    if (this.selectedTab == "institution") {
      const index = this.selection.findIndex((x) => (
          x.institute_id == item.institute_id ||
          x.entity_id == item.institute_id
        ));
      if (index == -1) {
        if (!item.entity_id) {
          item.entity_id = item.institute_id;
          item.entity_name = item.name;
          item.entity_type = "INSTITUTE";
        }

        this.selection.push(item);
      } else {
        this.selection.splice(index, 1);
      }
    } else {
      const index = this.selection.findIndex((x) => (
          x.company_id == item.company_id || x.entity_id == item.company_id
        ));
      if (index == -1) {
        if (!item.entity_id) {
          item.entity_id = item.company_id;
          item.entity_name = item.company_name;
          item.entity_type = "COMPANY";
        }

        this.selection.push(item);
      } else {
        this.selection.splice(index, 1);
      }
    }
  }

  isItemSelected(item) {
    if (this.selectedTab == "institution") {
      const index = this.selection.findIndex((x) => (
          x.institute_id == item.institute_id ||
          x.entity_id == item.institute_id
        ));
      return index == -1 ? false : true;
    } else {
      const index = this.selection.findIndex((x) => (
          x.company_id == item.company_id || x.entity_id == item.company_id
        ));
      return index == -1 ? false : true;
    }
  }

  getInstituteBySearch(name) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = await this.elastic.getAllInstitutebyName(
        this.pageNumber,
        10,
        name
      ) as any;
      resolve(res.data);
    });
  }
}

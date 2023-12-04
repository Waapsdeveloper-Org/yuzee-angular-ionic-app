import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import {
  CompanyApiService,
  PageRolesApiService,
} from "yuzee-shared-lib";

@Component({
  selector: "app-search-people",
  templateUrl: "./search-people.component.html",
  styleUrls: ["./search-people.component.scss"],
})
export class SearchPeopleComponent extends CcBasePage implements OnInit {
  users: any[] = [];
  _selected_data = [];
  selection = [];
  search = "";
  pageNumber = 1;
  pageSize = 10;
  limit = 1;
  changed: boolean = false;
  constructor(
    injector: Injector,
    private PageRolesService: PageRolesApiService,
    private companyApi: CompanyApiService
  ) {
    super(injector);
  }

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    if (this._selected_data.length > 0) {
      // eslint-disable-next-line no-underscore-dangle
      this.selection = [].concat(this._selected_data);
      // eslint-disable-next-line no-underscore-dangle
      this.users = [].concat(this._selected_data);
    }
    this.startSearch(false, true);
  }

  async startSearch(paginate = false, isInit = false) {
    if (!isInit) {
      if (this.search.length < 3) {
        return;
      }
    }

    if (!this.search) {
      return;
    }
    const res: any = await this.getPeopleSearch(this.search);
    const value = res;
    if (value.length !== 10) {
      this.limit = -1;
    }
    if (!paginate) {
      this.users = [].concat(value);
    } else if (paginate) {
      this.users = this.users.concat(value);
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

  pushSelectedUser(item) {
    this.changed = true;
    const index = this.selection.findIndex((x) => x.id == item.id);
    if (index == -1) {
      this.selection.push(item);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isItemSelected(item) {
    const index = this.selection.findIndex((x) => x.id == item.id);
    return index == -1 ? false : true;
  }

  getPeopleSearch(name) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = await this.PageRolesService.getAllPeopleUserList(1, name) as any;
      resolve(res.user_list);
    });
  }
}

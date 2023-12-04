/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInput, ModalController } from "@ionic/angular";
import { CompanyApiService } from "yuzee-shared-lib";

@Component({
  selector: "app-company-create-skills",
  templateUrl: "./company-create-skills.component.html",
  styleUrls: ["./company-create-skills.component.scss"],
})
export class CompanyCreateSkillsComponent implements OnInit {
  @ViewChild("input", { static: false }) inputEl: IonInput;
  speciality = [];
  _selected_data = [];
  selection = [];

  search = "";
  industryId;
  showDone = false;
  isback = false;
  isEmpty = false;
  pageNumber = 1;
  pageSize = 10;
  limit = 1;

  constructor(
    private modals: ModalController,
    private api: CompanyApiService
  ) {}

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    if (this._selected_data.length > 0) {
      this.selection = [].concat(this._selected_data);
      this.speciality = [].concat(this._selected_data);
    }
  }

  startSearch(paginate = false) {
    if (this.search.length < 3) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.api.getSpecialities(this.industryId, this.search, this.pageNumber, this.pageSize)
      .then((value: any) => {
        if (value.total_count >= this.pageSize) {
          this.limit = -1;
        }
        if (!paginate) {
          this.speciality = [].concat(value.response);
        } else if (paginate) {
          this.speciality = this.speciality.concat(value.response);
        }
      });
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
    this.modals.dismiss(data);
  }

  getSelectedLength() {
    return this.selection.length == 0 ? true : false;
  }

  save() {
    this.modals.dismiss(this.selection);
  }

  pushSelectedSpeciality(item) {
    const index = this.selection.findIndex(
      (x) => x.speciality_id == item.speciality_id
    );
    if (index == -1) {
      this.selection.push(item);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isItemSelected(item) {
    const index = this.selection.findIndex(
      (x) => x.speciality_id == item.speciality_id
    );
    return index == -1 ? false : true;
  }
}

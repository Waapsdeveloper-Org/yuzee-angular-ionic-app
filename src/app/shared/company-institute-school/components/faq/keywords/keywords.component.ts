import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInput, ModalController } from "@ionic/angular";
import { CommonApiService } from "yuzee-shared-lib";

@Component({
  selector: "app-keywords",
  templateUrl: "./keywords.component.html",
  styleUrls: ["./keywords.component.scss"],
})
export class KeywordsComponent implements OnInit {
  @ViewChild("input", { static: false }) inputEl: IonInput;
  keyword = [];
  nselected_data = [];
  selection = [];

  search = "";
  showDone = false;
  isback = false;
  isEmpty = false;
  pageNumber = 1;
  pageSize = 10;
  limit = 1;
  isChanged = false;
  constructor(private modals: ModalController, private api: CommonApiService) {}

  ngOnInit() {

    if (this.nselected_data.length > 0) {
      this.nselected_data.forEach((element) => {
        const obj = {
          keyword: element,
        };
        this.selection.push(obj);
        this.keyword.push(obj);
      });
    }
  }

  startSearch(paginate = false) {

    if (this.search.length < 3) {
      return;
    }
    this.api
      .getKeywordBySearch(this.pageNumber, this.pageSize, this.search)
      .then((res: any) => {
        const value = res.response;
        if (value.length !== 10) {
          this.limit = -1;
        }
        if (!paginate) {
          this.keyword = [].concat(value);
        } else if (paginate) {
          this.keyword = this.keyword.concat(value);
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
    this.modals.dismiss({
      selection: this.selection,
      isChanged: this.isChanged,
    });
  }

  pushSelectedkeyword(item) {
    const index = this.selection.findIndex((x) => x.keyword == item.keyword);
    this.isChanged = true;
    if (index == -1) {
      this.selection.push(item);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isItemSelected(item) {
    const index = this.selection.findIndex((x) => x.keyword == item.keyword);
    return index == -1 ? false : true;
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgrxService } from "src/app/services/store/ngrx.service";

@Component({
  selector: "app-generic-searchable-radio-selection",
  templateUrl: "./generic-searchable-radio-selection.component.html",
  styleUrls: ["./generic-searchable-radio-selection.component.scss"],
})
export class GenericSearchableRadioSelectionComponent implements OnInit {

  @Input() selected: any;
  @Input() title = "";
  @Input() keyToShow = "";
  @Input() data = [];
  @Input() hideResetBtn = false;
  @Input() placeholder = 'Search';

  @Input() dataEnum = '';
  @Input() showSearch = true;
  @Input() modalType = '';
  @Input() disableIndexes: any[] = [];

  sid;
  searchText: string = "";
  loader = false;


  constructor(public ngrx: NgrxService, private modal: ModalController) {

    ngrx.subscribe('app-generic-searchable-radio-selection:get:search-list', (data) => {
      this.data = data;
      console.log(data)
    });

    ngrx.subscribe('app-generic-searchable-radio-selection:get:paginate:search-list', (data) => {
      this.data = this.data.concat( data );
    });

  }

  ngOnInit() {

  }

  setSingleSelectedItem(item) {
    this.modal.dismiss({ value: item });
  }

  onSearchType($event) {
    if ($event && $event.target) {
      let v = $event.target.value;
      this.searchText = v;

      this.ngrx.publish("app-generic-searchable-radio-selection:post:search-list", {
        search: v,
        title: this.title
      });
    }
  }

  onIonInfinite($event){

    this.ngrx.publish("app-generic-searchable-radio-selection:paginate:search-list", {
      search: this.searchText,
      title: this.title
    });

    $event.target.complete();

  }

  goBack() {
    this.modal.dismiss();
  }

  resetValue(){
    this.selected = null;
    this.modal.dismiss({ reset: true });
  }

  isDisabled(i) {
    return this.disableIndexes.includes(i);
  }

}

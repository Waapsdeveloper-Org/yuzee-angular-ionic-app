import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgrxService } from "src/app/services/store/ngrx.service";

@Component({
  selector: "app-generic-multi-searchable-radio-selection",
  templateUrl: "./generic-multi-searchable-radio-selection.component.html",
  styleUrls: ["./generic-multi-searchable-radio-selection.component.scss"],
})
export class GenericMultiSearchableRadioSelectionComponent implements OnInit {
  // @Input() selected: any;
  @Input() title = "";
  @Input() keyToShow = "";
  @Input() data = [];
  @Input() showSearch = true;
  @Input() modalType = "";
  @Input() placeholder = 'Search'
  selected: any[];
  showDoneBtn = false;
  sid: any;
  searchTerm: string = "";
  displayResult = false;
  loading = false;

  constructor(public ngrx: NgrxService, public model: ModalController) {

    var self = this;
    
    ngrx.subscribe('app-generic-multi-searchable-radio-selection:get:search-list', (data) => {
      this.data = data;
      this.setDataSelected();
      this.displayResult = true;
      self.loading = false;
      
    });

    ngrx.subscribe('app-generic-multi-searchable-radio-selection:get:paginate:search-list', (data) => {
      this.data = this.data.concat( data );
      this.setDataSelected();
      self.loading = false;
    
    });

  }

  ngOnInit() {
    console.log("init multi again");
  }

  setDataSelected(){
    // this.data = this.data.map((v) => ({ ...v, isActive: false }));
    if (this.selected.length > 0) {
      this.selected.forEach((element) => {
        const index = this.data.findIndex(
          (x) =>
            x["" + this.keyToShow + ""] == element["" + this.keyToShow + ""]
        );
        if (index !== -1) {
          this.showDoneBtn = true;
          this.data[index].isActive = true;
        }
      });
    } else {
      this.displayResult = false
    }
  }

  setSelectedItem(item) {
    this.showDoneBtn = true;
    if (!item.isActive) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
    const index = this.data.findIndex((x) => x.isActive == true);
    if (index == -1) {
      this.showDoneBtn = false;
    }
  }

  onSearchType($event) {
    if ($event && $event.target) {
      // this.showDoneBtn = true;
      let v = $event.target.value;
      
      this.ngrx.publish("app-generic-multi-searchable-radio-selection:post:search-list", {
        search: v,
        title: this.title
      });
    } 
    // else {
    //   this.ngrx.publish("app-generic-multi-searchable-radio-selection:post:search-list", {
    //     search: '',
    //     title: this.title
    //   });
    // }
  }

  onIonInfinite($event){

    if(this.loading == true){
      $event.target.complete();
      return;
    }

    this.loading = true;
    this.ngrx.publish("app-generic-multi-searchable-radio-selection:paginate:search-list", {
      title: this.title
    });

    $event.target.complete();

  }

  goBack() {
    this.ngrx.unsubscribe();
    this.model.dismiss();
  }

  save() {
    this.ngrx.unsubscribe();
    let selected = this.data.filter( x => x.isActive == true);
    this.model.dismiss(selected);
  }

  apply(){
    this.ngrx.unsubscribe();
    let selected = this.data.filter( x => x.isActive == true);
    this.model.dismiss(selected);
  }

  reset(){
    this.ngrx.unsubscribe();
    let selected = this.data.map( x => {
      x.isActive = false;
      return x;
    }).filter( x => x.isActive == true);
    this.model.dismiss(selected);
  }
}

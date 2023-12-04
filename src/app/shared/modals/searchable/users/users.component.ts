import { Component, Injector, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgrxService } from "src/app/services/store/ngrx.service";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent extends CcBasePage implements OnInit {
  @Input() selected: any;
  @Input() title = "";
  @Input() keyToShow = "";
  @Input() data = [];
  @Input() showSearch = true;
  showDoneBtn = false;
  sid;
  searchTerm: string = "";
  isSaved = false;
  selectedUser = [];

  constructor(
    injector: Injector,
    public ngrx: NgrxService,
    public model: ModalController
  ) {
    super(injector);
  }

  ngOnInit() {
    this.data = this.data.map((v) => ({ ...v, isActive: false }));
    // this.setDataSelected(); (uncomment after fixing UI)
  }

  setDataSelected() {
    if (this.selected.length > 0) {
      this.selected.forEach((element: any) => {

        const index = this.data.findIndex((x) =>
            x["" + this.keyToShow + ""] == element["" + this.keyToShow + ""]
        );
        if (index !== -1) {
          this.showDoneBtn = true;
          this.data[index].isActive = true;
        }
      });
    }
  }

  selectUsers(item, i) {
    this.showDoneBtn = true;
    if (item.isActive) {
      this.selectedUser.splice(i, 1);
      this.data[i].isActive = false;
      this.isSaved = true;
    } else {
      item.isActive = true;
      this.selectedUser.push(item);
      this.isSaved = true;
    }
  }

  onSearchType($event) {
    if ($event && $event.target && $event.target.value) {
      this.showDoneBtn = true;
      let v = $event.target.value;
      this.ngrx.publishGenericModalListSearch({ data: v });
      this.ngrx.genericModalListSearchResult.subscribe();
    }
  }

  goBack() {
    this.ngrx.unsubscribe();
    this.model.dismiss();
  }

  save() {
    this.model.dismiss(this.selectedUser);
  }
}

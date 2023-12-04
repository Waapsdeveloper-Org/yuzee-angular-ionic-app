import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
@Component({
  selector: "app-company-select",
  templateUrl: "./company-select.component.html",
  styleUrls: ["./company-select.component.scss"],
})
export class CompanySelectComponent implements OnInit {
  @Input() data: any;
  @Input() type: string;
  @Input() title = "";
  @Input() showTitle = true;
  @Input() isTitleCase = true;
  @Input() disableIndexes = [];
  selectedData: any;
  constructor(private popUpModal: ModalController) {}

  ngOnInit() {}

  dismiss(selectedData) {
    console.log("selectedData:", selectedData, "Data:", this.data, "type:", this.type);
    this.popUpModal.dismiss({
      dismissed: true,
      data: selectedData,
      type: this.type
    });
  }

  selectValue(value: any) {
    this.selectedData = value;
    this.dismiss(this.selectedData);
  }

  goBack(): void {
    this.dismiss(this.selectedData);
  }

  isDisabled(i) {
    return this.disableIndexes.includes(i);
  }

  reset() {
    this.selectedData = null;
    this.dismiss(this.selectedData);
  }
}

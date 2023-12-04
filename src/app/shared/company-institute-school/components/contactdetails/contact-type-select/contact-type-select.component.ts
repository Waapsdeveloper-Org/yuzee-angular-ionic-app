import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-contact-type-select",
  templateUrl: "./contact-type-select.component.html",
  styleUrls: ["./contact-type-select.component.scss"],
})
export class ContactTypeSelectComponent implements OnInit {
  @Input() data: any;
  @Input() type: string;
  @Input() title = "";
  @Input() disableIndexes = [];
  selectedData: any;
  constructor(private popUpModal: ModalController) {}

  ngOnInit() {}

  dismiss(selectedData) {
    this.popUpModal.dismiss({
      dismissed: true,
      data: selectedData,
      type: this.type,
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

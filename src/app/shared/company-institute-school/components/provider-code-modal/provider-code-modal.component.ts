import { Component,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-provider-code-modal',
  templateUrl: './provider-code-modal.component.html',
  styleUrls: ['./provider-code-modal.component.scss'],
})
export class ProviderCodeModalComponent {

  @Input("data") data: any;
  @Input() type: string;
  @Input() disableIndexes = [];
  selectedData: any;
  selectedType: string;

  constructor(public modalCtrl: ModalController,
              private popUpModal: ModalController) {}

  closeModal()
  {
    this.modalCtrl.dismiss({
      dismissed: true,
      data: this.selectedData,
      type: this.type});
  }

  isDisabled(i)
  {
    return this.disableIndexes.includes(i);
  }

  dismiss(selectedData) {
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

}

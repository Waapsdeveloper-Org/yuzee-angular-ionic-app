// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, OnInit, Input,Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-generic',
  templateUrl: './pop-up-generic.component.html',
  styleUrls: ['./pop-up-generic.component.scss'],
})
export class PopUpGenericComponent implements OnInit {

  @Input() data: any;
  @Input() type: string;
  selectedData: any;
  constructor(private popUpModal: ModalController) { }

  ngOnInit() {
    console.log("DATA IN CHILD MODAL: ", this.data);
  }


  dismiss(selectedData) {

    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popUpModal.dismiss({
      'dismissed': true,
      'data':selectedData,
      'type':this.type,
    });
  }

  ionFocus(e) {
    console.log(e.detail.value);
    let selectedData = e.detail.value
    this.dismiss(selectedData);
  }
}

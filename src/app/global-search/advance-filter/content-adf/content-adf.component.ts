import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-content-adf',
  templateUrl: './content-adf.component.html',
  styleUrls: ['./content-adf.component.scss'],
})
export class ContentAdfComponent implements OnInit {

  @Input() searchData : any

  AuthorsArray: any = [];
  ContentAuthorsValue: any = [];
  authorList : any = []

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  removeAuthorFilter(author){
    let index = this.AuthorsArray.indexOf(author);
    if(index > -1){
        this.AuthorsArray.splice(index, 1);
    }
  }

  async openAuthorList() {
    const modal = await this.modalCtrl.create({component: 'ContentAuthorListComponent',
      componentProps:{'Authors': this.ContentAuthorsValue}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned)
        if(dataReturned.data != undefined){
          this.ContentAuthorsValue = dataReturned.data
        }
      }
    });
    return await modal.present();
  }



}

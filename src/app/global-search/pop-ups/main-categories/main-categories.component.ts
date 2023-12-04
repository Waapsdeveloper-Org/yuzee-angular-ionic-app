import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalCategories } from 'src/constants/global-categories';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.scss'],
})
export class MainCategoriesComponent implements OnInit {

  categoriesList: any = [];
  Selectecategory; any;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.Selectecategory = localStorage.getItem('tabName')
    this.categoriesList = GlobalCategories.categories;
  }

  radioGroupChange(event) {
    console.log("radioGroupChange", event);
    localStorage.setItem('tabName', event);
    this.modalCtrl.dismiss({
      dismissvalue: event.detail
    });
  }

}

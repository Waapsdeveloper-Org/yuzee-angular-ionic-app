import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit {

  AllCategory : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.AllCategory = [
      {
        category: 'Agriculture',
        isselected: false,
      },
      {
        category: 'Architecture',
        isselected: false,
      },
      {
        category: 'Art',
        isselected: false,
      },
      {
        category: 'Aviation',
        isselected: true,
      },
      {
        category: 'Business',
        isselected: false,
      },
      {
        category: 'Communication',
        isselected: false,
      },
      {
        category: 'Computer',
        isselected: true,
      },
      {
        category: 'Education',
        isselected: true,
      },
    ]
  }

  back() {
    this.modalCtrl.dismiss();
  }

}

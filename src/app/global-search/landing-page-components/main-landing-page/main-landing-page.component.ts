import { Component, OnInit } from '@angular/core';
import { GlobalCategories } from 'src/constants/global-categories';

@Component({
  selector: 'app-main-landing-page',
  templateUrl: './main-landing-page.component.html',
  styleUrls: ['./main-landing-page.component.scss'],
})
export class MainLandingPageComponent implements OnInit {

  categoriesList: any = [];


  constructor() { }

  ngOnInit() {
    this.categoriesList = GlobalCategories.categories;
  }
}

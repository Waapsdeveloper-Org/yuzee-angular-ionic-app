import { Component, Input, OnInit } from '@angular/core';

import { GlobalSearchApiServices } from 'yuzee-shared-lib';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-searched-wikipedia',
  templateUrl: './searched-wikipedia.component.html',
  styleUrls: ['./searched-wikipedia.component.scss'],
})
export class SearchedWikipediaComponent implements OnInit {
  @Input() searchData;
  wikiObject: any = {};
  WikiDataList: any = [];
  SelectedCategory: any;

  constructor(
    private globalSearchService: GlobalSearchApiServices,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log(this.searchData);
    localStorage.setItem('tabName', 'wikipedia');
    this.SelectedCategory = localStorage.getItem('tabName');
    this.searchData = localStorage.getItem('SearchData');
    this.searchWikipedia(this.searchData);
  }

  searchWikipedia(searchQuery) {
    this.globalSearchService.getSearchWikipedia(searchQuery).then(
      (data: any) => {
        this.wikiObject = data.query;
        this.WikiDataList = this.wikiObject.search;
        console.log(' WikiDataList ', this.WikiDataList);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

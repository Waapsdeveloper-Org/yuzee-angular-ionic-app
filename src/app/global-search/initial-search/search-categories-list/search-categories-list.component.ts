import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { globalSearchedList } from 'src/app/app.constants';
import { GlobalCategories } from 'src/constants/global-categories';

@Component({
  selector: 'app-search-categories-list',
  templateUrl: './search-categories-list.component.html',
  styleUrls: ['./search-categories-list.component.scss'],
})
export class SearchCategoriesListComponent implements OnInit {

  @Input() searchData
  @Output() categoryData = new EventEmitter<string>();

  categoriesList: any = [];
  SendGlobalData: any = {}
  sendObj: any = {};
  SearchedList = [];
  ShowBtn: any = true;
  searchDataObj = { detail:
    {value: ''}
  };
  constructor(private router: Router) { }

  ngOnInit() {
    this.SendGlobalData = this.searchData;
    this.categoriesList = GlobalCategories.categories;
    this.searchData =localStorage.getItem('SearchData');
    this.searchDataObj.detail.value = this.searchData;
        if (this.searchData != '') {
      this.getSearchList();
    } else {
      this.SearchedList = []
    }
  }
  ionViewWillEnter() {
  }

  getSearchList() {
    this.SearchedList = globalSearchedList;
  }

  searchByCategory(searchData, categoryTab) {
    this.sendObj.searchKeyword = searchData.searchString;
    this.sendObj.selectCategoryName = categoryTab.name;
    this.sendObj.selectCategoryTab = categoryTab.tabName;
    this.categoryData.emit(this.sendObj);
  }

  SeeAll(searchData, showresult) {
    this.sendObj.searchKeyword = searchData.searchString;
    this.sendObj.selectCategoryName = '';
    this.sendObj.selectCategoryTab = '';
    this.sendObj.ShowResult = showresult;
    this.categoryData.emit(this.sendObj);
  }

}


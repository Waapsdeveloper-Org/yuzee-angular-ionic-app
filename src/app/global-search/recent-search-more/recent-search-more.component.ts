import { Component, OnInit } from '@angular/core';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recent-search-more',
  templateUrl: './recent-search-more.component.html',
  styleUrls: ['./recent-search-more.component.scss'],
})
export class RecentSearchMoreComponent implements OnInit {

  recentSearchObj: any = {};
  recentSearchList: any = [];

  constructor(public modalCtrl: ModalController,private globalSearchService : GlobalSearchApiServices) { }

  ngOnInit() {
    this.getRecentSearchHistory()
  }

  getRecentSearchHistory(){
      this.globalSearchService.getRecentSearchsList(1)
      .then((data:any) =>{
        console.log("== Elastic Search History List ==", data);
        this.recentSearchObj = data
        this.recentSearchList = this.recentSearchObj.search_history;
        console.log("== Elastic Search History List ==", this.recentSearchList);
      },(err) => {
        console.log(err)
      })
  }

  recentSearch(search){
    console.log(search)
    this.modalCtrl.dismiss(search)
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

}

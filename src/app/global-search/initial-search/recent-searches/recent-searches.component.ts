import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';
import { ModalController } from '@ionic/angular';
// import { RecentSearchMoreComponent } from '..';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent implements OnInit {

  @Output() recentSearchData = new EventEmitter<any>();

  recentSearchObj: any = {};
  recentSearchList: any = [];

  constructor(public modalCtrl: ModalController,private globalSearchService : GlobalSearchApiServices) { }

  ngOnInit() {
    this.getRecentSearchHistory()
  }

  getRecentSearchHistory(){
    let search_history = [
      {
        searchString: 'Kali Williams',
        image: 'assets/imgs/Ellipse.svg',
        category: 'People'
      },
      {
        searchString: 'Canada',
        image: 'assets/imgs/flag-of-canada.svg',
        category: 'Country'
      },
      {
        searchString: 'University of Canada',
        image: 'assets/imgs/wollong.svg',
        category: 'Institution'
      },
      {
        searchString: 'Bachelor of Logistics and Supply Chain',
        image: 'assets/imgs/supply.svg',
        category: 'Course'
      },
      {
        image: 'assets/edit-popups/burgerking.svg',
        searchString: 'Burger King Corporation',
        category: "Companies"
      },
    ]

    this.recentSearchList = search_history

  }

  recentSearch(search){
    this.recentSearchData.emit(search)
  }

  async openSeeallRecent(){
    const modal = await this.modalCtrl.create({component: RecentSearchesComponent});
    modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          if(dataReturned.data != undefined){
              console.log(dataReturned.data)
              this.recentSearch(dataReturned.data)
            }
        }
    });
    return await modal.present();
  }

}

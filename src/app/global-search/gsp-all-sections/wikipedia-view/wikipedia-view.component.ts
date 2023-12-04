import { Component, OnInit, Input } from '@angular/core';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';

@Component({
  selector: 'app-wikipedia-view',
  templateUrl: './wikipedia-view.component.html',
  styleUrls: ['./wikipedia-view.component.scss'],
})
export class WikipediaViewComponent implements OnInit {

  @Input() SendGlobalData
  
  wikiObject: any = {};
  WikiDataList: any = [];

  constructor(private globalSearchService : GlobalSearchApiServices) { }

  ngOnInit() {
    console.log(this.SendGlobalData)
    this.searchWikipedia(this.SendGlobalData.searchString)
  }

  searchWikipedia(searchQuery){
    this.globalSearchService.getSearchWikipedia(searchQuery)
    .then((data:any) =>{
      this.wikiObject = data.query
      this.WikiDataList = this.wikiObject.search
      console.log(" WikiDataList ", this.WikiDataList);
    },(err) => {
      console.log(err)
    })
  }



}

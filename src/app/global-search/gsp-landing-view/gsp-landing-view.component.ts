import { Component, OnInit } from '@angular/core';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';

@Component({
  selector: 'app-gsp-landing-view',
  templateUrl: './gsp-landing-view.component.html',
  styleUrls: ['./gsp-landing-view.component.scss'],
})
export class GspLandingViewComponent implements OnInit {

  
  articleObj: any = {};
  articleList: any = [];
  
  constructor(private globalSearchService : GlobalSearchApiServices) { }

  ngOnInit() {
    this.latestArticles();
  }

  latestArticles(){
      this.globalSearchService.getLatestArticleList()
      .then((data:any) =>{
        this.articleObj = data
        this.articleList = data.data;
        console.log(" == article List == ", this.articleList);
      },(err) => {
        console.log(err)
      })
  }

 

}

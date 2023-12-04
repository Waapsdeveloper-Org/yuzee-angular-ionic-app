import { Component, OnInit, Input } from '@angular/core';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss'],
})
export class ContentViewComponent implements OnInit {

  @Input() searchData

  GSRObject : any = {}
  getGlobalSearchData : any = []
  countFilterValue: number;
  tempCount: number;
  filterDataObj: {};
  userData: any = {};

  CommentShow: any;
  
  constructor(private toastService: ToastService,private globalSearchService : GlobalSearchApiServices) { }

  ngOnInit() {
    console.log(this.searchData)
    this.userData = JSON.parse(localStorage.getItem('user_data_details'));
    console.log(this.searchData)
    this.searchArticle()
  }

  searchArticle(){
    if(this.searchData.searchString){
      if(this.searchData.searchString != ""){
          this.countFilterValue = 1
          this.tempCount = 1
          setTimeout(()=>{ 
              this.filterDataObj = {
                  "searchString" : this.searchData.searchString,
                  "index":'yuzee_dev_article',
                  "type":'article',
                  "pageSize":10,
                  "startIndex":1,
                  "filterDates":{
                    "postDate": null
                  },
                  "filters":{
                    "author": [],
                  },
                  "threshold" : 1
                }
          
              this.globalSearchService.globalSearch(this.filterDataObj)
              .then((data:any) =>{
                this.GSRObject = data
            },(err) => {
              console.log(err)
            })
          }, 300);
      }
      else{
        this.toastService.presentToast('Please Search Keyword required')
      }
    }
    else{
      this.toastService.presentToast('Please Search Keyword required')
    }
  }

  showComment(come){
    this.CommentShow = come
  }

}

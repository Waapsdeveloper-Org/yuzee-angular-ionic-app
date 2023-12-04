import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';
import { YoutubeApiService } from 'src/services/youtube-service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-videos-view',
  templateUrl: './videos-view.component.html',
  styleUrls: ['./videos-view.component.scss'],
})
export class VideosViewComponent implements OnInit {

  @Input() searchData


  YoutubeUrlDataList : any = [
    {
      snippet : {
        channelTitle : "Test Video",
        thumbnails : {
          medium : {
            url : "assets/imgs/profile/vid_03.png"
          }
        }
      },
      statistics : {
        likeCount : 20,
        commentCount : 20
      }
    },
    {
      snippet : {
        channelTitle : "Test Video 2",
        thumbnails : {
          medium : {
            url : "assets/imgs/profile/vid_03.png"
          }
        }
      },
      statistics : {
        likeCount : 10,
        commentCount : 10
      }
    }
  ]

  userData: any = {};
  sendData : any = {}
  videosObj: any = {};
  videosList: any = [];

  videosData: any = {};
  YoutubeUrls: any = [];
  getYoutubeItemData: any = {};

  totalNumber: number = 1;
  pageNumber: number;
  videosInfinteResultGet: any = [];

  constructor(private toastService: ToastService,public modalCtrl: ModalController,private globalSearchService : GlobalSearchApiServices,public plt: Platform,private youtubeService: YoutubeApiService,private youtube: YoutubeVideoPlayer) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data_details'));
    console.log(this.searchData)
    // this.searchGlobalData()
  }

  searchGlobalData(){
    this.sendData = {
        "searchString" : this.searchData.searchString,
        "index":"yuzee_dev_youtube_video",
        "type":"youtube_video",
        "pageSize":10,
        "startIndex":1,
        "filters": this.searchData.filters
    }
    this.globalSearchService.globalSearch(this.sendData)
    .then((data:any) =>{
      console.log(data)
      if(data.status == 400){
        this.toastService.presentToast(data.message)
      }
      else{
        this.videosObj = data
        this.videosList = this.videosObj.data
        this.videosList.forEach((value) => {
          this.getYoutubeData(value.vedio_id)
        })
      }
    },(err) => {
      console.log(err)
    })
  }

  doInfiniteYoutube(infiniteScroll) {
    this.pageNumber = this.totalNumber + 1
    this.sendData.startIndex = this.pageNumber
    console.log(this.pageNumber)
    console.log(infiniteScroll);
    setTimeout(() => {
      this.globalSearchService.globalSearch(this.sendData)
        .then((data:any) =>{
        console.log("===== Inst Data ====", data);
        if(data.status == "OK"){
          this.videosObj = data
          this.videosInfinteResultGet = this.videosObj.data
          this.videosInfinteResultGet.forEach(value => {
            this.getYoutubeData(value.vedio_id)
          });
          this.totalNumber = this.pageNumber
        }
        else if(data.status == 400){
          this.toastService.presentToast(data.message)
        }
        infiniteScroll.target.complete();
      },(err) => {
        console.log(err)
      })
    }, 500);
  }

  getYoutubeData(videoId){
    console.log(videoId)
    this.getYoutubeItemData = this.youtubeService.getVideosItemData(videoId);
    this.getYoutubeItemData.then(data => {
      console.log('Video Data', data)
      if(data.items.length != 0){
        this.YoutubeUrlDataList.push(data.items[0])
      }
    },(err) => {
      console.log(err)
    }) 
  }

  openVideo(videoId){
    this.videosData = this.youtubeService.getVideosData(videoId);
    this.videosData.then(data => {
      console.log('Video Data', data)
    },(err) => {
      console.log(err)
    })
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + videoId);
    }
  }
  
 

}

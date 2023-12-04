import { Component, OnInit, Input } from '@angular/core';
import { CompanyHelperService } from 'src/app/services/company-helper.service';

@Component({
  selector: 'app-internship-program-videos',
  templateUrl: './internship-program-videos.component.html',
  styleUrls: ['./internship-program-videos.component.scss'],
})
export class InternshipProgramVideosComponent implements OnInit {
  @Input() videosArray = [];
  @Input() obj;
  addVideos = {};
  constructor(public ccHelper: CompanyHelperService) { }

  ngOnInit() {
   
  
    this.callIntroductoryVideoApi()



    setTimeout(() => {
      this.addVideos = {
        initialSlide: 0,
        slidesPerView: this.checkScreenForVideos(),
        speed: 400,
      };
    } , 1000);
  }

  ionViewWillEnter(){
  
  }
  checkScreenForVideos() {
    if (window.innerWidth >= 750) {
      return 4.5;
    } else {
      return 2.5;
    }
  }

  async callIntroductoryVideoApi(){
    
    const res = await this.ccHelper.getIntroductoryVideosInternshipProgram(this.obj.company_internship_id, {
      pageNumber: 1,
      pageSize: 10,
    }) as [];

    this.videosArray = res;
    

  }

  returnVideoAb(item){

    if(item?.about_me_video?.file_url){
      return item?.about_me_video?.file_url
    }
    return null;

  }

  returnVideoLength(item){
    if(item?.about_me_video?.length){
      return item?.about_me_video?.length
    }
    return null;
  }
}

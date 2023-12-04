import { Component, OnInit, Input } from '@angular/core';
import { CourseResultDemo } from 'src/constants/course-result-demo';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';
import { ModalController } from '@ionic/angular';
import { CourseDetailPage } from 'src/app/search';
import { NormalSearchService } from 'yuzee-shared-lib';
import { ToastService } from 'src/services/toast.service';
import { NearestCourseMapComponent } from 'src/app/shared';
import { CourseInformationApiService } from 'yuzee-shared-lib';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
})
export class CourseViewComponent implements OnInit {

  @Input() searchData
  courseObj: any = {};
  courseList: any = [];
  userData: any = {};
  courseViewCountryCount : any = []
  sendData: any = {};
  SearchFavData: any = {};
  filterApply: boolean;
  recommendation : boolean;
  totalNumber: number = 1;
  pageNumber: number;
  courseInfinteResultGet: any = [];

  constructor(private CourseInfoService:CourseInformationApiService,private toastService: ToastService,public NormalSearchApiService : NormalSearchService,public modalCtrl: ModalController,private globalSearchService : GlobalSearchApiServices) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data_details'));
    console.log(this.searchData)
    this.recommendation = false;
    if(this.searchData.searchString != ''){
      this.recommendation = false;
      this.searchGlobalData()
    }
    else{
      this.recommendation = true;
    }
  }

  searchGlobalData(){
    this.sendData = {
        "searchString" : this.searchData.searchString,
        "index":"yuzee_dev_course",
        "type":"course",
        "pageSize":10,
        "startIndex":1,
        "currencyCode":this.userData.currencyCode,
        "threshold":1,
        "filters": this.searchData.filters,
        "rangeFilter" : this.searchData.rangeFilter,
        "priceFilter" : this.searchData.priceFilter
    }
    this.globalSearchService.globalSearch(this.sendData)
    .then((data:any) =>{
      console.log(data)
      if(data.status == "OK"){
        this.courseObj = data
        this.courseList = this.courseObj.data
        if(this.courseList.length != 0){
          this.courseList.forEach((value) => {
            value.heartValue = true;
            value.domvalue = false;
            value.intvalue = false;
            if(this.userData.citizenship == value.country_name){
              value.domvalue = true;
            }
            else{
              value.intvalue = true;
            }
          });
        }
      }
      else if(data.status == 400){
        this.toastService.presentToast(data.message)
      }
    },(err) => {
      console.log(err)

    })
  }

   doInfiniteCourse(infiniteScroll) {
      this.pageNumber = this.totalNumber + 1
      this.sendData.startIndex = this.pageNumber
      console.log(this.pageNumber)
      console.log(infiniteScroll);
      setTimeout(() => {
        this.globalSearchService.globalSearch(this.sendData)
          .then((data:any) =>{
          console.log("===== Inst Data ====", data);
          if(data.status == "OK"){
            this.courseObj = data
            this.courseInfinteResultGet = this.courseObj.data
            this.courseInfinteResultGet.forEach(value => {
              value.heartValue = true;
              value.domvalue = false;
              value.intvalue = false;
              if(this.userData.citizenship == value.country_name){
                value.domvalue = true;
              }
              else{
                value.intvalue = true;
              }
              this.courseList.push(value)
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

  setActive(result,value) {
    console.log(result)
    console.log(value)
    if(value == 'dom'){
      result.domvalue = true;
      result.intvalue = false;
    }
    else if(value == 'int'){
      result.domvalue = false;
      result.intvalue = true;
    }
  }

  async openMap(result) {
    const modal = await this.modalCtrl.create({component: NearestCourseMapComponent,
      componentProps:{'ParamsCourse': result}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
        }
      }
    });
    return await modal.present();
  }

  goCoursesDetails(result){
      this.CourseInfoService.courseInformation(result.course_id)
      .then((data:any) =>{
        this.toastService.presentToast(data.message)
        if(data.status == 200){
            this.goingCoursesDetails(data.data)
        }
      },(err) => {
        console.log(err)
      })
  }

  async goingCoursesDetails(result) {
    const modal = await this.modalCtrl.create({component: CourseDetailPage,
      componentProps:{'params': result}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
        }
      }
    });
    return await modal.present();
  }



  clickFavourite(Result){
    console.log(Result)
    Result.heartValue = true;
    this.SearchFavData.courseIds = [Result.course_id];
    // this.SearchFavData.sortAsscending = true;
    // this.SearchFavData.sortBy = "ASC";
    this.NormalSearchApiService.favoriteCourse(this.SearchFavData)
    .then((data:any) =>{
      console.log("===== Filter Data Array ====", data);
      setTimeout(() => {
            let index = this.courseList.indexOf(Result);
            if(index > -1){
              this.courseList.splice(index, 1);
            }
      }, 1500);
      console.log(this.courseList)
    },(err) => {
      console.log(err)
    })
  }

  demoResult(){
    this.courseObj = CourseResultDemo.CourseResult
    this.courseList = this.courseObj.data
    if(this.courseList.length != 0){
      this.courseList.forEach((value) => {
        value.heartValue = true;
        value.domvalue = false;
        value.intvalue = false;
        value.currencyCode = this.userData.currencyCode
        if(this.userData.citizenship == value.countryName){
          value.domvalue = true;
        }
        else{
          value.intvalue = true;
        }
      });
    }
  }



  

  

}

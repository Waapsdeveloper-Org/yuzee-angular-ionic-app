import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';
import { ToastService } from 'src/services/toast.service';
import { InstitutionProfilePage } from 'src/app/institution/partials/institution-profile/institution-profile.page';

@Component({
  selector: 'app-institution-view',
  templateUrl: './institution-view.component.html',
  styleUrls: ['./institution-view.component.scss'],
})
export class InstitutionViewComponent implements OnInit {

  @Input() searchData

  instituteObj: any = {};
  instituteList: any = [];
  sendData: any = {
    filters : {}
  };
  userData: any = {};
  filterApply: boolean;
  recommendation: boolean;

  totalNumber: number = 1;
  pageNumber: number;
  instInfinteResultGet: any = [];

  constructor(private toastService: ToastService,public modalCtrl: ModalController,private globalSearchService : GlobalSearchApiServices) { }

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
        "index":"yuzee_dev_institute",
        "type":"institute",
        "pageSize":10,
        "startIndex":1,
        "threshold":1,
        "filters": this.searchData.filters
    }
    this.globalSearchService.globalSearch(this.sendData)
    .then((data:any) =>{
      console.log(data)
      if(data.status == 400){
        this.toastService.presentToast(data.message)
      }
      else{
        this.instituteObj = data
        this.instituteList = this.instituteObj.data
      }
    },(err) => {
      console.log(err)
    })
  }

  doInfiniteInstitute(infiniteScroll) {
    this.pageNumber = this.totalNumber + 1
    this.sendData.startIndex = this.pageNumber
    console.log(this.pageNumber)
    console.log(infiniteScroll);
    setTimeout(() => {
      this.globalSearchService.globalSearch(this.sendData)
        .then((data:any) =>{
        console.log("===== Inst Data ====", data);
        if(data.status == "OK"){
          this.instituteObj = data
          this.instInfinteResultGet = this.instituteObj.data
          this.instInfinteResultGet.forEach(value => {
            this.instituteList.push(value)
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

  async goInstitutionProfile(instituton) {
    const modal = await this.modalCtrl.create({component: InstitutionProfilePage,
      componentProps: { 'paramsInstituton': instituton }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
        }
      }
    });
    return await modal.present();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-scholarship-view',
  templateUrl: './scholarship-view.component.html',
  styleUrls: ['./scholarship-view.component.scss'],
})
export class ScholarshipViewComponent implements OnInit {

  @Input() searchData
  GSRObject : any = {}
  getGlobalSearchData : any = []
  userData: any = {};
  sendData : any = {}
  scholarshipObj: any = {};
  scholarshipList: any = [];

  constantData = [
    {
      "scholarship_id": "42ac8048-773f-11eb-a757-02f6d1a05b4e",
      "name": "Scholarship test5",
      "readable_id": "",
      "description": "test",
      "scholarship_award": "4000",
      "number_of_avaliability": 100,
      "currency": null,
      "amount": 100,
      "is_percentage_amount": false,
      "validity": "International",
      "how_to_apply": "Dont know",
      "gender": "male",
      "eligible_nationalities": [
        "Indian",
        "Pakistani"
      ],
      "website": "www.kodytechnolab.com",
      "benefits": "test",
      "requirements": "test",
      "conditions": "India",
      "successful_canidates": "India",
      "is_active": null,
      "languages": [
        "english",
        "hindi"
      ],
      "country_names": [
        "India",
        "Pakistan"
      ],
      "media": null,
      "levels": [
        {
          "level_id": "421b0f63-a4cd-11ea-a757-02f6d1a05b4e",
          "name": "Bachelor",
          "code": "BA",
          "description": null
        },
        {
          "level_id": "30b0bffd-a4cd-11ea-a757-02f6d1a05b4e",
          "name": "Associate Degree",
          "code": "ADEG",
          "description": null
        }
      ],
      "faculty": {
        "faculty_id": "152c2c83-0941-11eb-a757-02f6d1a05b4e",
        "name": "Computer Science",
        "description": null,
        "icon": null
      },
      "institute": {
        "institute_id": "049796a8-c292-11ea-a757-02f6d1a05b4e",
        "country_name": "United StatesAWAIS",
        "city_name": "Bozeman",
        "institute_type": "Language School",
        "name": "AWAIS.C.E. Language Institutes - Montana State University",
        "world_ranking": 0,
        "latitude": "45.6711928",
        "longitude": "-111.049653",
        "description": null,
        "campus": null,
        "level_code": null,
        "stars": null,
        "faculty_names": null,
        "intakes": [
          "InstituteIntake(id=7131b7a6-502d-11eb-a757-02f6d1a05b4e, intake=January, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=71450cbd-502d-11eb-a757-02f6d1a05b4e, intake=March, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=715d41b1-502d-11eb-a757-02f6d1a05b4e, intake=May, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=7175a3f7-502d-11eb-a757-02f6d1a05b4e, intake=June, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=718928dd-502d-11eb-a757-02f6d1a05b4e, intake=August, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=719ce19f-502d-11eb-a757-02f6d1a05b4e, intake=October, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)"
        ],
        "level_name": null,
        "tag_line": null,
        "is_active": true,
        "readable_id": null,
        "institute_english_requirements": null,
        "institute_facilities": null,
        "institute_services": null,
        "institute_intakes": [
          "InstituteIntake(id=7131b7a6-502d-11eb-a757-02f6d1a05b4e, intake=January, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=71450cbd-502d-11eb-a757-02f6d1a05b4e, intake=March, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=715d41b1-502d-11eb-a757-02f6d1a05b4e, intake=May, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=7175a3f7-502d-11eb-a757-02f6d1a05b4e, intake=June, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=718928dd-502d-11eb-a757-02f6d1a05b4e, intake=August, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)",
          "InstituteIntake(id=719ce19f-502d-11eb-a757-02f6d1a05b4e, intake=October, createdOn=null, updatedOn=null, deletedOn=null, createdBy=null, updatedBy=null)"
        ],
        "institute_category": null
      },
      "has_edit_access": null,
      "intakes": [
        {
          "intake_id": "ffd491ea-80c4-11eb-a757-02f6d1a05b4e",
          "student_category": "INTERNATIONAL",
          "intake_date": "2021-03-02",
          "intake_deadline": "2021-01-30"
        }
      ]
    },
    {
      "scholarship_id": "9bd9d8d9-7a31-11eb-a757-02f6d1a05b4e",
      "name": "A Plus English",
      "readable_id": "",
      "description": "hello",
      "scholarship_award": null,
      "number_of_avaliability": null,
      "currency": "FJD",
      "amount": 5000,
      "is_percentage_amount": false,
      "validity": "international",
      "how_to_apply": "hellp",
      "gender": "male",
      "eligible_nationalities": [
        "morocco"
      ],
      "website": "http://localhost:4200/institution/ff716c3b-c291-11ea-a757-02f6d1a05b4e/about",
      "benefits": "hello",
      "requirements": "hello",
      "conditions": "hello",
      "successful_canidates": "hello",
      "is_active": null,
      "languages": [
        "Abkhazian"
      ],
      "country_names": [
        "germany"
      ],
      "media": null,
      "levels": [
        {
          "level_id": "43c9636e-a4cd-11ea-a757-02f6d1a05b4e",
          "name": "Primary",
          "code": "PRI",
          "description": null
        }
      ],
      "faculty": {
        "faculty_id": "e959044c-c5f6-4f0b-badc-ac1d74a1870e",
        "name": "English",
        "description": null,
        "icon": null
      },
      "institute": {
        "institute_id": "0abdef47-2981-11eb-a757-02f6d1a05b4e",
        "country_name": "Malaysia",
        "city_name": "Subang Jaya",
        "institute_type": "Language School",
        "name": "A Plus English",
        "world_ranking": 0,
        "latitude": "3.0567333",
        "longitude": "101.5851192",
        "description": null,
        "campus": null,
        "level_code": null,
        "stars": null,
        "faculty_names": null,
        "intakes": [],
        "level_name": null,
        "tag_line": null,
        "is_active": false,
        "readable_id": null,
        "institute_english_requirements": null,
        "institute_facilities": null,
        "institute_services": null,
        "institute_intakes": [],
        "institute_category": null
      },
      "has_edit_access": null,
      "intakes": [
        {
          "intake_id": "1d96f122-80c5-11eb-a757-02f6d1a05b4e",
          "student_category": "INTERNATIONAL",
          "intake_date": "2021-03-02",
          "intake_deadline": "2021-01-30"
        }
      ]
    }
  ]

  constructor(private toastService: ToastService,public modalCtrl: ModalController,private globalSearchService : GlobalSearchApiServices) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data_details'));
    console.log(this.searchData)
    // this.searchGlobalData()
    this.scholarshipList = this.constantData
  }

  searchGlobalData(){
    this.sendData = {
        "searchString" : this.searchData.searchString,
        "index":"yuzee_dev_scholarship",
        "type":"scholarship",
        "pageSize":10,
        "startIndex":1,
        "threshold":1,
        "currencyCode":this.userData.currencyCode,
        "filters": this.searchData.filters
    }
    this.globalSearchService.globalSearch(this.sendData)
    .then((data:any) =>{
      console.log(data)
      if(data.status == 400){
        this.toastService.presentToast(data.message)
      }
      else{
        this.scholarshipObj = data
        this.scholarshipList = this.scholarshipObj.data
      }
    },(err) => {
      console.log(err)
    })
  }

}

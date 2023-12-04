import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as _ from 'underscore/underscore';
import {
  CommonApiService,
  UserProfileService,
} from 'yuzee-shared-lib';

import {
  IonInput,
  ModalController,
  NavParams,
} from '@ionic/angular';

@Component({
  selector: 'app-generic-single-select-search',
  templateUrl: './generic-single-select-search.component.html',
  styleUrls: ['./generic-single-select-search.component.scss'],
})
export class GenericSingleSelectSearchComponent implements OnInit {

  dataType;
  countryList = [];
  @ViewChild('input', { static: false }) inputEl: IonInput;
  myInput = '';
  isback: boolean = false;
  isEmpty: boolean = false;
  LanguaugeList = [];
  languageEficiencyList = [];

  constructor(public modalCtrl: ModalController, private userProfileService: UserProfileService, private navParams: NavParams, private CommonService: CommonApiService) { }

  ngOnInit() {
    if (this.navParams.get("datatype")) {
      this.dataType = this.navParams.get("datatype");
      if (this.dataType === 'patent office') {
        this.getCountry();
      }else if (this.dataType === 'language') {
        this.getAllLanguages();
      }else if (this.dataType === 'proficiency type'){
        this.getProficiencyTypes()
      }
    }
    if (this.navParams.get("data")) {
      this.myInput = this.navParams.get("data");
      if (this.dataType === 'patent office') {
        this.getCountry();
      }
    }

  }

  ionViewDidEnter() {
    setTimeout(_ => { this.inputEl.setFocus() }, 200);
  }

  sortArray(array,sortby){
    let data = sortby
    
  }

  getProficiencyTypes() {
    this.userProfileService
      .getLanguageProfeciencyType()
      .then((res: any) => {
        this.languageEficiencyList = res.data;
        this.languageEficiencyList.sort((a, b) => {
          if (a.displayName < b.displayName) {
            return -1;
          }
          if (a.displayName > b.displayName) {
            return 1;
          }
          return 0;
        });
        if (this.languageEficiencyList.length !== 0) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCountry() {
    this.CommonService.getCountry()
      .then((data: any) => {
        this.countryList = data;
        this.countryList.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        if (this.countryList.length !== 0) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }       
      })
  }

  getAllLanguages() {
    this.CommonService.getLanguages().then(
      (data: any) => {
        this.LanguaugeList = data;
        this.LanguaugeList.sort((a, b) => {
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        if (this.LanguaugeList.length !== 0) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  chooseItem(data) {
    this.modalCtrl.dismiss(data)
  }

  goBack() {
    if (this.isback) {
      this.isback = false;
    } else {
      this.isback = true;
      setTimeout(() => {
        this.isback = false;
      }, 300);
    }
    this.modalCtrl.dismiss()
  }

}

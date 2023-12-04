import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { ToastService } from 'src/services/toast.service';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-course-adf',
  templateUrl: './course-adf.component.html',
  styleUrls: ['./course-adf.component.scss'],
})
export class CourseAdfComponent implements OnInit {

  @Input() searchData : any
  @Output() applyFiltersValue = new EventEmitter<string>();
  
  SearchKeyword : any;
  CountryArray : any = []
  CityArray: any = [];
  applyObj: any = {};
  countFilterValue: number = 1;
  LevelSendSelected: any = [];
  CoursesArray: any = [];
  FacultyArray: any = [];
  ModeArray: any = [];
  DeliveryArray: any = [];

  Cost:any = { lower: 0, upper: 100000 };
  Duration:any = { lower: 0, upper: 10 };
  userData: any = {};

  constructor(private toastService: ToastService,public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.searchData)
    this.userData = JSON.parse(localStorage.getItem('user_data_details'));

    
    if(this.searchData.filters.country_name){
      this.searchData.filters.country_name.forEach(element => {
        this.CountryArray.push({name: element,isActive:true})
      });
    }
    if(this.searchData.filters.city_name){
      this.searchData.filters.city_name.forEach(element => {
        this.CityArray.push({name: element,isActive:true})
      });
    }
    if(this.searchData.filters.level_Code){
      this.searchData.filters.level_Code.forEach(element => {
        this.LevelSendSelected.push({code: element,isActive:true})
      });
    }
    if(this.searchData.filters.name){
      this.searchData.filters.name.forEach(element => {
        this.CoursesArray.push({name: element,isActive:true})
      });
    }
    if(this.searchData.filters.faculty_name){
      this.searchData.filters.faculty_name.forEach(element => {
        this.FacultyArray.push({name: element,isActive:true})
      });
    }
    if(this.searchData.filters.part_full){
      this.searchData.filters.part_full.forEach(element => {
        this.ModeArray.push({name: element,isActive:true})
      });
    }
    if(this.searchData.filters.delivery_mode){
      this.searchData.filters.delivery_mode.forEach(element => {
        this.DeliveryArray.push({name: element,isActive:true})
      });
    }

    if(this.searchData.priceFilter.price){
      this.Cost = { lower: this.searchData.priceFilter.price[0], upper: this.searchData.priceFilter.price[1] }
    }

    if(this.searchData.rangeFilter.duration){
      this.Duration = { lower: this.searchData.rangeFilter.duration[0], upper: this.searchData.rangeFilter.duration[1] }
    }

  }

  removeCountryFilter(facul){
    let index = this.CountryArray.indexOf(facul);
    if(index > -1){
        this.CountryArray.splice(index, 1);
    }
  }

  async openCountryModal() {
    const modal = await this.modalCtrl.create({component: 'CountrySearchMultipleComponent',
      componentProps:{'Countries': this.CountryArray}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned)
        if(dataReturned.data != undefined){
          this.CountryArray = []
          this.CountryArray = dataReturned.data
          this.searchData.filters.country_name = Array.prototype.map.call(this.CountryArray, country => country.name)
        }
      }
    });
    return await modal.present();
  }

  removeCityFilter(city){
    let index = this.CityArray.indexOf(city);
    if(index > -1){
        this.CityArray.splice(index, 1);
    }
  }

  async openCityModal() {
    const modal = await this.modalCtrl.create({component: 'CitySearchMultipleComponent',
      componentProps:{'Cities': this.CityArray}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned)
        if(dataReturned.data != undefined){
          this.CityArray = dataReturned.data
          this.searchData.filters.city_name = Array.prototype.map.call(this.CityArray, city => city.name)
        }
      }
    });
    return await modal.present();
  }

  removeLevelsFilter(lvls){
    let index = this.LevelSendSelected.indexOf(lvls);
    if(index > -1){
        this.LevelSendSelected.splice(index, 1);
    }
  }

  async openLevels(){
    const modal = await  this.modalCtrl.create({component: 'LevelListMultipleComponent',
        componentProps:{'FiltersLevels': this.LevelSendSelected}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
          this.LevelSendSelected = []
          this.LevelSendSelected = dataReturned.data
          this.searchData.filters.level_Code = Array.prototype.map.call(this.LevelSendSelected, levels => levels.code)
        }
      }
    });
    return await modal.present();
  }

  async openCoursesFilter() {
    const modal = await this.modalCtrl.create({component: 'CourseSearchMultipleComponent',
      componentProps:{'Courses': this.CoursesArray}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
          this.CoursesArray = []
          this.CoursesArray = dataReturned.data
          this.searchData.filters.name = Array.prototype.map.call(this.CoursesArray, course => course.name)
        }
      }
    });
    return await modal.present();
  }

  removeCourseFilter(cat){
    let index = this.CoursesArray.indexOf(cat);
    if(index > -1){
        this.CoursesArray.splice(index, 1);
    }
  }

  async openFaculties() {
    const modal = await this.modalCtrl.create({component: 'FacultyListMultipleComponent',
      componentProps:{'Faculties': this.FacultyArray}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
          this.FacultyArray = []
          this.FacultyArray = dataReturned.data
          this.searchData.filters.faculty_name = Array.prototype.map.call(this.FacultyArray, faculty => faculty.name)
          
        }
      }
    });
    return await modal.present();
  }

  removeFacultysFilter(cat){
    let index = this.FacultyArray.indexOf(cat);
    if(index > -1){
        this.FacultyArray.splice(index, 1);
    }
  }


  async openModeModal() {
    const modal = await this.modalCtrl.create({component: 'ModeMultipleComponent',
      componentProps:{'Modes': this.ModeArray}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
            this.ModeArray = []
            this.ModeArray = dataReturned.data
            this.searchData.filters.part_full = Array.prototype.map.call(this.ModeArray, mode => mode.name)
        }
      }
    });
    return await modal.present();
  }

  removeModeFilter(cat){
    let index = this.ModeArray.indexOf(cat);
    if(index > -1){
        this.ModeArray.splice(index, 1);
    }
  }

  async openDeliveryModal() {
    const modal = await this.modalCtrl.create({component: 'DeliveryMultipleComponent',
      componentProps:{'Delivery': this.DeliveryArray}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
            this.DeliveryArray = []
            this.DeliveryArray = dataReturned.data
            this.searchData.filters.delivery_mode = Array.prototype.map.call(this.DeliveryArray, delevery => delevery.name)   
        }
      }
    });
    return await modal.present();
  }

  removeDelFilter(cat){
    let index = this.DeliveryArray.indexOf(cat);
    if(index > -1){
        this.DeliveryArray.splice(index, 1);
    }
  }

  changeDur(){
    this.searchData.rangeFilter.duration = [this.Duration.lower,this.Duration.upper]
  }

  changePrice(){
    this.searchData.priceFilter.price = [this.Cost.lower,this.Cost.upper]
  }
  

  submitApply(){
    console.log(this.searchData)
    if(this.searchData.filters){
        var keys = Object.keys(this.searchData.filters);
        this.countFilterValue = keys.length + 1;
        console.log(this.countFilterValue)
    }
    this.applyFiltersValue.emit(this.searchData)
    this.applyObj.searchData = this.searchData
    this.applyObj.CountryArray = this.CountryArray
    this.applyObj.CityArray = this.CityArray
    this.applyObj.LevelSendSelected = this.LevelSendSelected
    this.applyObj.CoursesArray = this.CoursesArray
    this.applyObj.FacultyArray = this.FacultyArray
    this.applyObj.ModeArray = this.ModeArray
    this.applyObj.DeliveryArray = this.DeliveryArray
    this.applyObj.countFilterValue = this.countFilterValue
    this.applyObj.type = 'course'
    this.applyObj.indexValue = 'yuzee_dev_course'
    this.applyObj.searchString = this.searchData.searchString

    if(this.searchData.searchString != undefined){
      this.modalCtrl.dismiss(this.applyObj)
    }
    else{
      this.toastService.presentToast("Please Search Keyword Specified To Search.")
    }
  }

}

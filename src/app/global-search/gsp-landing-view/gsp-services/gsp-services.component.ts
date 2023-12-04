import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gsp-services',
  templateUrl: './gsp-services.component.html',
  styleUrls: ['./gsp-services.component.scss'],
})
export class GspServicesComponent implements OnInit {

  servicesInfo: boolean;

  serviceList : any = [
    {
      'name' : 'Education Counselling Services',
      'desc' : 'Feeling confused about your future?',
      'about' : 'Get your Education Counselling Session with our professional counsellors today',
      'img' : 'assets/imgs/globalicon/new-icons/service-yuz_01.png'
    },
    {
      'name' : 'Direct Application',
      'desc' : 'Apply directly to an Institution of your choosing',
      'about' : '',
      'img' : 'assets/imgs/globalicon/new-icons/service-yuz_02.png'
    },
    {
      'name' : 'Direct Receive Offers',
      'desc' : 'Send your application to several different institutions',
      'about' : '',
      'img' : 'assets/imgs/globalicon/new-icons/service-yuz_03.png'
    }
]

  constructor() { }

  ngOnInit() {}

  openSeeAllServices(){
    this.servicesInfo = !this.servicesInfo
  }

}

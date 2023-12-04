import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-internship-program-members',
  templateUrl: './internship-program-members.component.html',
  styleUrls: ['./internship-program-members.component.scss'],
})
export class InternshipProgramMembersComponent implements OnInit {
  @Input() membersArray = [];
  @Input() title = '';
  @Input() seeAll = false;
  constructor() { }

  ngOnInit() {
  }

  returnLocationString(item){

    let str = '';
    
    str += item.city_name ? item.city_name + ' ' : '';
    str += item.country_name ? item.country_name : '';


    return str;
  }

  returnImagePath(item){

    if(!item.image_path){
      return 'assets/images/profile-img.jpg';
    }

    return item.image_path;

  }

}

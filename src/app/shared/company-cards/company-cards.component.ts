import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-cards',
  templateUrl: './company-cards.component.html',
  styleUrls: ['./company-cards.component.scss'],
})
export class CompanyCardsComponent implements OnInit {
  @Output() moreOptions = new EventEmitter<string>();

  @Input('list') list = []
  constructor(public router:Router) {
  }

  ngOnInit() {
  }

  openCompany(item){
    localStorage.setItem("company_id", String(item.id));
    this.router.navigate(['company-profile'])
  }

  ionViewWillEnter(){
  }
  openMoreOptions(name){
    this.moreOptions.emit(name);
  }

  returnLocationString(item){

    if(item && item.company_location && item.company_location.length > 0){
      let element = item.company_location[0]
      let str = element?.city_name + " "  + element?.state_name  +" " + element?.country_name +" "
      return str;
    }

    return "";
  }
  setImage(item){

    if(item?.logo_url){
      return item.logo_url;
    }
}
}
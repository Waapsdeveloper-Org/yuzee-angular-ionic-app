import { Component, OnInit } from '@angular/core';
import { CcModalService } from 'src/app/services/cc-modal.service';

@Component({
  selector: 'app-domestic-ranking-popup',
  templateUrl: './domestic-ranking-popup.component.html',
  styleUrls: ['./domestic-ranking-popup.component.scss'],
})
export class DomesticRankingPopupComponent implements OnInit {

  instituteList: any[] = [
   
    {
      icon: "melbourne-university",
      name: "Humboldt University of Berlin",
      city: " Berlin",
      country: "Germany",
      totalRatings: "1,321",
      stars:"4"
    },

    {
      icon: "arizona-university",
      name: "University of Arizona",
      city: " Berlin",
      country: "Germany",
      totalRatings: "1,321",
      stars:"4"
    },
    {
      icon: "toronto-university",
      name: "University of Toronto",
      city: " Berlin",
      country: "Germany",
      totalRatings: "1,321",
      stars:"4"
    },
    {
      icon: "amesterdem-university",
      name: "University of Amsterdam",
      city: " Berlin",
      country: "Germany",
      totalRatings: "1,321",
      stars:"4"
    }
      
  ];

  constructor(private ccModalService: CcModalService) { }

  ngOnInit() {}

 dismiss() 
  {
    this.ccModalService.dismiss();
  }

}

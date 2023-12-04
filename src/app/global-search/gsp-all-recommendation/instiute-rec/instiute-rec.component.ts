import { Component, OnInit } from '@angular/core';
import { RecombeeApiServices } from 'yuzee-shared-lib';


@Component({
  selector: 'app-instiute-rec',
  templateUrl: './instiute-rec.component.html',
  styleUrls: ['./instiute-rec.component.scss'],
})
export class InstiuteRecComponent implements OnInit {

  recommendationInstitutionList : any = []
  ratingNumber: any = 5;

  constructor(private recombeeServices : RecombeeApiServices) { }

  ngOnInit() {
    this.getInstituteRec()
  }

  getInstituteRec(){
      this.recombeeServices.getInstitutionRecommendationList()
      .then((data:any) =>{
        console.log("== inst Rec List ==", data);
        this.recommendationInstitutionList = data
      },(err) => {
        console.log(err)
      })
  }

}

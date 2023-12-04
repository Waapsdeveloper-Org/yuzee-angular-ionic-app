import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CompanyApiService} from 'yuzee-shared-lib';
import {SharedService} from '../../../services/shared.service';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {

  items = [
    {
    para:`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
    diam nonumy eirmod tempor invidunt ut labore et dolore
    magna aliquyam erat, sed diam voluptua. At vero eos et
    accusam et justo duo dolores et ea rebum. Stet clita.`
    }
  ];

  constructor(private router: Router,
    private shared: SharedService,
              private companyApi: CompanyApiService) { }

  ngOnInit() {
   // this.getEducationDetails();
  }

  goToEducationEditing() {
    this.router.navigate(['company-profile/company-internship-detail/edit-education']);
  }

  /* getEducationDetails() {
    this.companyApi.getCompanyInternshipEducation(this.shared.companyId,this.shared.companyInternship.id)
    .then((res)=>{
      console.log("INTERNSHIP EDUCATION GET : ", res);
    })
  }*/


}

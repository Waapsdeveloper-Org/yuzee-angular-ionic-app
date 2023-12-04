import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-about-us-institution',
  templateUrl: './about-us-institution.component.html',
  styleUrls: ['./about-us-institution.component.scss'],
})
export class AboutUsInstitutionComponent implements OnInit {

  instituteBasicInfo: any;
  @Input("isInstitute") isInstitute;

  constructor(private sharedService: SharedService,) { }

  ngOnInit() {
    this.sharedService.instituteBasicInfo.subscribe((res) => {
      this.instituteBasicInfo = res;
    });
  }

}

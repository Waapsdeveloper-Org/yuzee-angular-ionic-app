import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-company-gallery-tab',
  templateUrl: './company-gallery-tab.component.html',
  styleUrls: ['./company-gallery-tab.component.scss'],
})
export class CompanyGalleryTabComponent  implements OnInit {
  companyId;
  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.companyId = this.sharedService.companyId;
  }

}

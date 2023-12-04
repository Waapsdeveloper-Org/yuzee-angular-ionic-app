import { Component, Injector, Input, OnInit } from '@angular/core';
import { courseListArray } from 'src/app/app.constants';
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CompanyHelperService } from "src/app/services/company-helper.service";
import { InternshipProgramDetailsComponent } from '../internship-program-details/internship-program-details.component';

@Component({
  selector: 'app-internship-program-list',
  templateUrl: './internship-program-list.component.html',
  styleUrls: ['./internship-program-list.component.scss'],
})
export class InternshipProgramListComponent extends CcBasePage implements OnInit {
  @Input() internshipProgramListArray = [];
  @Input('title') title = '';
  
  

  constructor(
    injector: Injector,
    public ccHelperService: CompanyHelperService
  ) {
    super(injector);
  }

 
  openDetails(program) {
    this.ccModalService.present(InternshipProgramDetailsComponent, { internshipProgramDetails: program }, '', 'right', 'md');
  }

  
  ngOnInit() {
   
  }

  returnImageToShowOnList(item){


  
    if(item?.storage && item?.storage.length > 0){

      // filter png 
      let pngLink = item?.storage.find( x => x.file_type == 'png');
      if(pngLink){

        if(pngLink.file_url){
          return pngLink.file_url;
        }
      }

    }

    return courseListArray[0].img;

  }
}

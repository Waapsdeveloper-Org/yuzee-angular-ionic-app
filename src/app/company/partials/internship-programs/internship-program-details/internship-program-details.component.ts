import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  RECOMMENDATIONS_USERS,
  courseListArray,
  internshiDetailedInfo,
} from "src/app/app.constants";
import {
  InternshipProgramMoreOptionsComponent,
  SeeAllAttachmentsComponent,
  SeeAllMembersListComponent,
  SeeAllSkillSetComponent,
} from "src/app/company/shared";
import { CcModalService } from "src/app/services/cc-modal.service";
import { CompanyHelperService } from "src/app/services/company-helper.service";

@Component({
  selector: "app-internship-program-details",
  templateUrl: "./internship-program-details.component.html",
  styleUrls: ["./internship-program-details.component.scss"],
})
export class InternshipProgramDetailsComponent implements OnInit {
  
  @Input() internshipProgramDetails = internshiDetailedInfo;
  staticDetails = internshiDetailedInfo;
  internshipProgramMembers = RECOMMENDATIONS_USERS;
  internshipProgramListArray = courseListArray;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(
    private modalCtrl: ModalController,
    private ccModalService: CcModalService,
    public ccHelperService: CompanyHelperService
  ) {}

  ngOnInit() {
    this.initialize();
    
  }
  async initialize() {
    
    const res = (await this.ccHelperService.getAllInternShip(
      this.pageNumber,
      this.pageSize
    )) as [];

    this.internshipProgramListArray = res;
  }

  moreOptions(): Promise<void> {
    return this.ccModalService.present(
      InternshipProgramMoreOptionsComponent,
      {},
      "generic-modal generic-model-backdrops generic-alert-popup-modal",
      "",
      "ios"
    );
  }
  seeAllSkills(skills) {

    this.ccModalService.present(
      SeeAllSkillSetComponent,
      { arrayData: skills, title: "Skill Set" },
      "",
      "right",
      "md"
    );
  
  }
  seeAllMembers(members) {
    this.ccModalService.present(
      SeeAllMembersListComponent,
      { arrayData: members, title: "Members" },
      "",
      "right",
      "md"
    );
  }
  seeAllAttachments() {
    this.ccModalService.present(
      SeeAllAttachmentsComponent,
      { arrayData: [], title: "Attachments" },
      "",
      "right",
      "md"
    );
  }
  goBack() {
    this.modalCtrl.dismiss();
  }

  returnImageToShowOnList(item){

    // courseListArray
  
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

  returnJobTags(item){


    return [
      {
        name: item?.category
      },
      {
        name: item?.type
      }
    ]
  }


}

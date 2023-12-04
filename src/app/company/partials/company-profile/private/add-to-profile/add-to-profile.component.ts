/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Component,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { CreateEditEventComponent } from 'src/app/events';
import { CcBasePage } from 'src/app/shared/cc-base-page/cc-base-page';

import { EditFAQPage } from 'src/app/shared/company-institute-school/components/faq/edit-faq/edit-faq.page';
import { LocationEditPage } from 'src/app/shared/company-institute-school/components/location/location-edit/location-edit.page';

import { EditAchievementsComponent } from '../achievements/edit-achievements/edit-achievements.component';
import { EditawardscertifcatesPage } from '../awards/editawardscertifcates/editawardscertifcates.page';
import { EditPartnersComponent } from '../partners/edit-partners/edit-partners.component';
import { EditworkwithusPage } from '../workwithus/editworkwithus/editworkwithus.page';
import { addToProfileInstitutionArray, companyAddToProfileArray } from 'src/app/app.constants';
import { EditProfileContactDetailsComponent } from 'src/app/shared';
import { TellUsMoreAboutEditComponent } from 'src/app/institution/partials/institution-profile/tell-us-more-about-edit/tell-us-more-about-edit.component';

@Component({
  selector: "app-add-to-profile",
  templateUrl: "./add-to-profile.component.html",
  styleUrls: ["./add-to-profile.component.scss"],
})
export class AddToProfileComponent extends CcBasePage implements OnInit {
  @Input() isInstitue;
  locationObj: any;
  workingHours: any;
  ncontactDetails: any;
  title: string = "Add to Your Profile";
  data: any;

  items: any[] = companyAddToProfileArray
  uitems: any[] = [
        {
          name: "Location",
          modal: LocationEditPage,
        },
        {
          name: "Why work with Us",
          modal: EditworkwithusPage,
        },
        {
          name: "Contact Details",
          modal: EditProfileContactDetailsComponent,
        },
        {
          name: "Our Achievements",
          modal: EditAchievementsComponent,
        },
        {
          name: "Awards and Certifications",
          modal: EditawardscertifcatesPage,
        },
        {
          name: "Our Partners",
          modal: EditPartnersComponent,
        },
        {
          name: "FAQ",
          modal: EditFAQPage,
        },
        {
          name: "Online",
          modal: CreateEditEventComponent,
          data: {
            eventType: "ONLINE",
            userType: "COMPANY",
            moduleID: this.shared.companyId,
          },
        },
        {
          name: "In-Person",
          modal: CreateEditEventComponent,
          data: {
            eventType: "OFFLINE",
            userType: "COMPANY",
            moduleID: this.shared.companyId,
          },
        }
  ];
  instItems: any[] = addToProfileInstitutionArray;
  instituteItems: any[] = [
    {
      name: "About",
      isExpanded: false,
      section: [

        {
          name: "More about this institution",
          description: "Let people know how to contact you",
          modal: TellUsMoreAboutEditComponent,
        },

        {
          name: "Location",
          description: "Set up location and working hours",
        },
        {
          name: "Campuses",
          description: "Don't be shy, tell us about yourself.",

        },
        {
          name: "Services",
          description: "Add provided services at institution",
        },
        {
          name: "FAQ",
          description: "Add frequently asked questions",
        },
      ],
    },
    {
      name: "Courses",
      section: [
        {
          name: "Courses",
          description: "Add provided course at institution"
        },
      ],
    },
    {
      name: "Off-Campus Classes",
      section: [{ name: "Class", description: "Add off campus classes provided" }],
    },
    {
      name: "Scholarships",
      section: [
        {
          name: "Scholarship",
          description: "Create a scholarship",
        },
      ],
    },
    {
      name: "Events",
      section: [
        {
          name: "Online",
          description: "Create an online event ",
        },

        {
          name: "In-Person",
          description: "Create an event at a specific location",
        },
      ],
    },

  ];
  constructor(injector: Injector, public router: Router) {
    super(injector);

    if(this.isInstitue)
    {
        this.data = this.instItems;
    }
    else {this.data = this.items;}

  }

  ngOnInit() {
  }

  expand(index: number) {
    let isExpanded = this.items[index].isExpanded;
    if (!isExpanded) {
      this.items[index].isExpanded = true;
    } else {
      this.items[index].isExpanded = false;
    }
  }

  dismiss() {
    this.ccModalService.dismiss();
  }

  openSelectedModal($event){
    let item = this.uitems.find( x => x.name == $event.name);
    if(item && item.modal){
      this.openModal(item);
    }
  }

  async openModal(item) {
    let data = null;
    if (item.name == "Location") {
      data = {
        _location: this.locationObj,
        _timeTemplate: this.workingHours,
      };
    } else if (item.name == "Contact Details") {
      data = {
        // eslint-disable-next-line no-underscore-dangle
        _totalItem: this.ncontactDetails,
      };
    } else if (item.name == "Online") {
      data = item.data;
    } else if (item.name == "In-Person") {
      data = item.data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await this.ccModalService.present(item.modal, data, "modal-full-screen-view", "right", "md");
  }
}

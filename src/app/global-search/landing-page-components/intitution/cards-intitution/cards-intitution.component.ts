import { Component, Input, OnInit } from '@angular/core';
import { CcModalService } from 'src/app/services/cc-modal.service';
import {
  GlobalSearchSectionMoreOptionComponent,
  SearchedInstitutionRelatedCoursesComponent,
} from 'src/app/global-search';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-intitution',
  templateUrl: './cards-intitution.component.html',
  styleUrls: ['./cards-intitution.component.scss'],
})
export class CardsIntitutionComponent implements OnInit {
  @Input() seeAll = false;
  @Input() item: any;
  selection = '';

  details = [
    {
      name: 'Faculties',
      active: false,
      expandDetails: [
        {
          icon: 'assets/svgs/global-search/leaf-icon.svg',
          title: 'Agriculture',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/axe-icon.svg',
          title: 'Law',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/help-icon.svg',
          title: 'Humanities & Social Science',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/building-icon.svg',
          title: 'Architecture Building & Plan',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/money-icon.svg',
          title: 'Business, Finance Accounting',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/language-icon.svg',
          title: 'Language & Literature',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/settings-icon.svg',
          title: 'Engineering',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/laptop-icon.svg',
          title: 'Computer Science & I.T',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/aviation-icon.svg',
          title: 'Aviation',
          desc: '21',
        },
      ],
    },
    {
      name: 'Facilities',
      active: false,
      expandDetails: [
        {
          icon: 'assets/svgs/global-search/run-icon.svg',
          title: 'Sports Center',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/heart-beat-icon.svg',
          title: 'Health Services',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/airplane-icon.svg',
          title: 'Airport Pickup',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/baby-cart-icon.svg',
          title: 'Childcare Centre',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/people-icon.svg',
          title: 'Cultural inclusion/ anti-racism programs',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/bus-icon.svg',
          title: 'Bus',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/train-icon.svg',
          title: 'Train',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/medical-icon.svg',
          title: 'Medical',
          desc: '21',
        },
        {
          icon: 'assets/svgs/global-search/disability-icon.svg',
          title: 'Disability Support',
          desc: '21',
        },
      ],
    },
    {
      name: 'Campus',
      active: false,
      expandDetails: [],
    },
  ];

  constructor(
    public modals: CcModalService,
    private ccModalService: CcModalService,public sharedService:SharedService,public router:Router
  ) {}

  openInstitutionProfile(item) {
    this.sharedService.instituteId=item
        this.router.navigate(["institution-profile/about"], {
          state: { paramsPrivate: "private" },
        });
      }

  ngOnInit() {}
  moreOptions() {
    this.ccModalService.present(
      GlobalSearchSectionMoreOptionComponent,
      {},
      'generic-sm-popup-modal generic-modal generic-model-backdrops',
      '',
      'ios'
    );
  }
  openDetails(item) {
    this.modals.present(SearchedInstitutionRelatedCoursesComponent, { item });
  }
  moreExpansion(value) {
    this.details = this.details.map((x) => {
      if (x.name === value.name) {
        x.active = !x.active;
      } else {
        x.active = false;
      }

      return x;
    });
  }

  doExpand(key) {
    return this.details.find((x) => x.active === true && x.name === key) != null;
  }

  setImage(item) {
    if (item?.logo_url) {
      return item.logo_url;
    }

    return 'assets/svgs/global-search/institution.svg';
  }

  getLocationStr(item: any) {
    let str = '';
    if (item.city_name){
      str += item.city_name + ', ';
    }

    if (item.state){
      str += item.state + ', ';
    }

    if (item.country_name){
      str += item.country_name + ', ';
    }

    str = str.trim().replace(/,*$/, '');

    return str;
  }
}

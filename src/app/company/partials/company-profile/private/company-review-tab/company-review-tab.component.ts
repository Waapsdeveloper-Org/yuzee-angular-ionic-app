/* eslint-disable @typescript-eslint/no-shadow */
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ReviewApiService } from 'yuzee-shared-lib';
import { CreateReviewComponent } from './create-review/create-review.component';
import { CcBasePage } from 'src/app/shared/cc-base-page/cc-base-page';

@Component({
  selector: 'app-company-review-tab',
  templateUrl: './company-review-tab.component.html',
  styleUrls: ['./company-review-tab.component.scss'],
})
export class CompanyReviewTabComponent extends CcBasePage  implements OnInit, AfterViewInit {

  reviewAvg: any;
  reviews: any;
  reviewStars: any;
  reviewNetwork: any;
  reviewDetails: any;
  instituteObje = {entityId: "", entityType: "INSTITUTE"};
  reviewDetailObje = {entityId: "", entityType: "INSTITUTE", pageNumber: 1, pageSize: 1000};
  modalCtrl: any;

  constructor(injector: Injector, private reviewService: ReviewApiService, private sharedService: SharedService) {
    super(injector)
   }
  ngAfterViewInit(): void {

    this.instituteObje.entityId = this.sharedService.instituteId;
    this.reviewService.getReviewAverage(this.instituteObje).then((res) => {
      if(res)
      {
        this.reviewDetailObje.entityId = this.sharedService.instituteId;
        // eslint-disable-next-line no-shadow
        this.sharedService.reviewStarsObj.subscribe((res) => {
          this.reviewStars = res;
          this.reviewService.getAllEntityReviews(this.reviewDetailObje, this.reviewStars ? this.reviewStars : 0, "")
          .then((res) => {
            this.reviews = res['data'].response;
          });
        });


        this.sharedService.reviewNetworkObj.subscribe((res) => {
          this.reviewNetwork = res;
          this.reviewService.getAllEntityReviews(this.reviewDetailObje, 0, this.reviewNetwork ? this.reviewNetwork : "")
          .then((res) => {
            this.reviews = res['data'].response;
          });
        });

      }
      this.reviewAvg = res['data'][0];
    });
  }

  ngOnInit() {}
   openWriteReview() {
    
    this.ccModalService.present(CreateReviewComponent)
  }


}

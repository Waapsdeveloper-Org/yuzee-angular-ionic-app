import { Component, Injector, Input, OnInit } from '@angular/core';
import { courseListArray } from 'src/app/app.constants';
import { GlobalSearchSectionMoreOptionComponent } from 'src/app/global-search/pop-ups/global-search-section-more-option/global-search-section-more-option.component';
import { GlobalSearchInstituteHelperService } from 'src/app/services/global-search/global-search-institute-helper.service';
import { CourseInfoPopupComponent } from 'src/app/shared';
import { CcBasePage } from 'src/app/shared/cc-base-page/cc-base-page';
@Component({
  selector: 'app-searched-institution-related-courses',
  templateUrl: './searched-institution-related-courses.component.html',
  styleUrls: ['./searched-institution-related-courses.component.scss'],
})
export class SearchedInstitutionRelatedCoursesComponent
  extends CcBasePage
  implements OnInit
{
  @Input() seeAll = false;
  @Input() item;
  courseList = courseListArray;
  isPlatformIos = false;
  page = 1;
  list = [];
  constructor(
    injector: Injector,
    private gcHelper: GlobalSearchInstituteHelperService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getCourseListData();
  }
  getCourseListData() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.gcHelper.getCourseBySearch()) as any[];
      this.courseList = res;
      resolve(true);
    });
  }

  openDetails() {
    this.ccModalService.present(SearchedInstitutionRelatedCoursesComponent);
  }

  moreOptions() {
    this.ccModalService.present(
      GlobalSearchSectionMoreOptionComponent,
      {},
      'generic-sm-popup-modal generic-modal generic-model-backdrops',
      '',
      'ios'
    );
  }
  openCourseInfo() {
    this.ccModalService.present(
      CourseInfoPopupComponent,
      {},
      'generic-privacy-popup-modal generic-modal generic-model-backdrops',
      '',
      'ios'
    );
  }

  goBack() {
    this.ccModalService.dismiss();
  }
}

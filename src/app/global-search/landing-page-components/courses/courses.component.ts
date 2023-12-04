import { Component, Input, OnInit } from '@angular/core';
import { courseListArray } from 'src/app/app.constants';
import { CcModalService } from 'src/app/services/cc-modal.service';
import { GlobalSearchSectionMoreOptionComponent } from '../..';
import { CourseInfoPopupComponent } from 'src/app/shared';
import { NgrxService } from 'src/app/services/store/ngrx.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input('showSeeAllBtn') seeAll = false;
  courseList =  [];    //courseListArray;
  isPlatformIos = false;
  // constructor(private ccModalService: CcModalService) { }
  constructor(
    private ccModalService: CcModalService,
    public ngrx: NgrxService
  ) {
    this.ngrx.subscribe(
      "global-search-courses",
      this.updateList.bind(this)
    );
  }

  

  ngOnInit() {
  }
  updateList(data) {
    this.courseList = data;
  }
  moreOptions(event) {
    this.ccModalService.present(GlobalSearchSectionMoreOptionComponent, {}, "generic-sm-popup-modal generic-modal generic-model-backdrops", "", "ios");
  }
  openCourseInfo(event) {
    this.ccModalService.present(CourseInfoPopupComponent, {}, "modal-full-screen-view", "right", "md");
  }
  openCourseDetails() {}

}

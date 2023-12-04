import { Component, OnInit } from '@angular/core';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';

@Component({
  selector: 'app-gsp-top-ten-courses',
  templateUrl: './gsp-top-ten-courses.component.html',
  styleUrls: ['./gsp-top-ten-courses.component.scss'],
})
export class GspTopTenCoursesComponent implements OnInit {

  courseList: any = [];
  courseInfo: boolean;
  ratingNumber : number = 4

  constructor(private globalSearchService : GlobalSearchApiServices) { }

  ngOnInit() {
    this.top10randomCourseList();
  }

  top10randomCourseList(){
    this.globalSearchService.getTop10randomCourseList()
    .then((data:any) =>{
      this.courseList = data;
      console.log("== top 10 Random ==", this.courseList);
    },(err) => {
      console.log(err)
    })
  }

  openSeeAllCourses(){
    this.courseInfo = !this.courseInfo
  }

}

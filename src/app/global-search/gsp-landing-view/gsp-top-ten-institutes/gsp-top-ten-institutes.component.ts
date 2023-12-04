import { Component, OnInit } from '@angular/core';
import { GlobalSearchApiServices } from 'yuzee-shared-lib';

@Component({
  selector: 'app-gsp-top-ten-institutes',
  templateUrl: './gsp-top-ten-institutes.component.html',
  styleUrls: ['./gsp-top-ten-institutes.component.scss'],
})
export class GspTopTenInstitutesComponent implements OnInit {

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

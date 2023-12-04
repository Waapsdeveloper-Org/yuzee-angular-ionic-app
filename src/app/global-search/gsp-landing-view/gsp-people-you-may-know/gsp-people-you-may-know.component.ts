import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gsp-people-you-may-know',
  templateUrl: './gsp-people-you-may-know.component.html',
  styleUrls: ['./gsp-people-you-may-know.component.scss'],
})
export class GspPeopleYouMayKnowComponent implements OnInit {

  courseInfo: boolean;

  constructor() { }

  ngOnInit() {}

  openSeeAllCourses(){
    this.courseInfo = !this.courseInfo
  }

}

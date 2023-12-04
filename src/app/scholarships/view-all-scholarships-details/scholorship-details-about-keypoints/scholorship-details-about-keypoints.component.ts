import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholorship-details-about-keypoints',
  templateUrl: './scholorship-details-about-keypoints.component.html',
  styleUrls: ['./scholorship-details-about-keypoints.component.scss'],
})
export class ScholorshipDetailsAboutKeypointsComponent implements OnInit {

  @Input('title') title: string;
  @Input('list') list: any[];
  

  constructor() { }

  ngOnInit() {}

}

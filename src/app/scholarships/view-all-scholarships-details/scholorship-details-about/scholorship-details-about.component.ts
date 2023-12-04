import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholorship-details-about',
  templateUrl: './scholorship-details-about.component.html',
  styleUrls: ['./scholorship-details-about.component.scss'],
})
export class ScholorshipDetailsAboutComponent implements OnInit {


  @Input('title') title: any;
  @Input('description') description: any;

  constructor() { }

  ngOnInit() {
    
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholorship-details-requirements',
  templateUrl: './scholorship-details-requirements.component.html',
  styleUrls: ['./scholorship-details-requirements.component.scss'],
})
export class ScholorshipDetailsRequirementsComponent implements OnInit {

  @Input('data') data: any;
  
  constructor() { }

  ngOnInit() {}

}

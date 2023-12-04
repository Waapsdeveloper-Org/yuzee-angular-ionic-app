import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholorship-details-other',
  templateUrl: './scholorship-details-other.component.html',
  styleUrls: ['./scholorship-details-other.component.scss'],
})
export class ScholorshipDetailsOtherComponent implements OnInit {

  @Input('data') data: any;

  constructor() { }

  ngOnInit() {}

}

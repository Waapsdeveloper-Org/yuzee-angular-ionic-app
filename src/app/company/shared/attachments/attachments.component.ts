/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {

  constructor(private router: Router) { }
  namePdf = "Flayr.pdf";
  namePng = "Flayr.png";
  items = [
    {name:'Flyers 1.pdf',
    type:"pdf"},
    {name:'Flyers 2.png',
    type:"png"},
  ]
  ngOnInit() {}

  goToEditAttachments() {
    this.router.navigate(['company-profile/careerAdvice/edit-career/edit-attachments'])
  }


}

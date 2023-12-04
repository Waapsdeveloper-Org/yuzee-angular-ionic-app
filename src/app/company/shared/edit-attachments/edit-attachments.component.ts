import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-attachments',
  templateUrl: './edit-attachments.component.html',
  styleUrls: ['./edit-attachments.component.scss'],
})
export class EditAttachmentsComponent implements OnInit {
  name="Attachments";
  route = "company-profile/careerAdvice/edit-career";
  constructor() { }

  ngOnInit() {}

}

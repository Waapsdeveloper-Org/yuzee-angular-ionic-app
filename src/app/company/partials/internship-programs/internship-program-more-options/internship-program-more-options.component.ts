import { Component, Input, OnInit } from '@angular/core';
import { AccessControlService } from 'yuzee-shared-lib';

@Component({
  selector: 'app-internship-program-more-options',
  templateUrl: './internship-program-more-options.component.html',
  styleUrls: ['./internship-program-more-options.component.scss'],
})
export class InternshipProgramMoreOptionsComponent implements OnInit {
  @Input() isInstitute;
  hasAccessScholarshipDelete;

  constructor(private accessControlService: AccessControlService) { }

  ngOnInit() {
    this.hasAccessScholarshipDelete = this.accessControlService.hasAccess("SCHOLARSHIP", "SCHOLARSHIP_DELETE");
  }

}

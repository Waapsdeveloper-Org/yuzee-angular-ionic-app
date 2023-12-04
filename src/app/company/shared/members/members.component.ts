import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  seeAllMembers() {
    this.router.navigate(['company-profile/company-internship-detail/see-allmembers']);
  }

}

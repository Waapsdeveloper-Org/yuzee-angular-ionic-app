import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-skillset',
  templateUrl: './skillset.component.html',
  styleUrls: ['./skillset.component.scss'],
})
export class SkillsetComponent implements OnInit {

  items = [
    {
      label:"Bachelor of Psychology",
      icon:"creative.svg"
    },
    {
      label:"Bachelor of Information Technology",
      icon:"IT.svg"
    },
    {
      label:"Bachelor of Mechanical Engineering",
      icon:'timemanage.svg'
    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {}

  editSkills() {
    this.router.navigate(['company-profile/careerAdvice/edit-career/edit-skill']);
  }
}

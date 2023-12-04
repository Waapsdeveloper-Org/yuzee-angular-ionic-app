import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-courses-structure',
  templateUrl: './skills-courses-structure.component.html',
  styleUrls: ['./skills-courses-structure.component.scss'],
})
export class SkillsCoursesStructureComponent implements OnInit {
  @Input() title = '';
  @Input() infoArray = [];
  @Input() seeAll = false;
  constructor() { }

  ngOnInit() {
  
  }

}

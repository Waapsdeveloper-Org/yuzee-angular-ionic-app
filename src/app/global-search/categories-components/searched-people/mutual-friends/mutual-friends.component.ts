import { Component, OnInit } from '@angular/core';
import { RECOMMENDATIONS_USERS } from 'src/app/app.constants';

@Component({
  selector: 'app-mutual-friends',
  templateUrl: './mutual-friends.component.html',
  styleUrls: ['./mutual-friends.component.scss'],
})
export class MutualFriendsComponent implements OnInit {
  usersArray = RECOMMENDATIONS_USERS;
  constructor() { }

  ngOnInit() {}

}

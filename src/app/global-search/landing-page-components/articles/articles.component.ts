import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {

  articles = []

  constructor() { }

  ngOnInit() {
    this.articles = [{
      title: 'Why The Freelance Life May Get Easier',
      writer: 'Monash University',
      icon: 'images-outline',
      iconColor: '#daa520',
      date: '14 OCT , 2020',
      image: 'assets/images/madison.jpg'
    }
      ,
    {
      title: 'My Three Years Journey With The Monash University',
      writer: 'Yuzee',
      icon: 'git-branch-outline',
      iconColor: '#2596be',
      date: '14 OCT , 2020',
      image: 'assets/images/pexels.jpeg'
    } ]}

}

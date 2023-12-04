import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss'],
})
export class ArticleViewComponent implements OnInit {

  articleList : any = [
    {
      category : "News",
      heading : "How much Do International Students Bring To The Economy?",
      article_img : "assets/imgs/globalicon/new-icons/article-news.png",
      url : "www.bestuniever.com"
    },
    {
      category : "Campus Life",
      heading : "How To Not Overspend Your Money As A Student",
      article_img : "assets/imgs/globalicon/new-icons/campus-life.png",
      url : "www.bestuniever.com"
    },
    {
      category : "Internships And Jobs",
      heading : "Why The Freelance Life May Get Easier",
      article_img : "assets/imgs/globalicon/new-icons/internship-jobs.png",
      url : "www.bestuniever.com"
    },
    {
      category : "News",
      heading : "NYU Offers Free Jobs For All Medical Students",
      article_img : "assets/imgs/globalicon/new-icons/article-news.png",
      url : "www.bestuniever.com"
    },
    {
      category : "News",
      heading : "NYU Offers Free Jobs For All Medical Students",
      article_img : "assets/imgs/globalicon/new-icons/article-news.png",
      url : "www.bestuniever.com"
    }
  ]

  constructor() { }

  ngOnInit() {
    console.log(this.articleList)
  }

}

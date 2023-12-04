import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-suggestion',
  templateUrl: './search-suggestion.component.html',
  styleUrls: ['./search-suggestion.component.scss'],
})
export class SearchSuggestionComponent implements OnInit {

  searchSuggestion = []

  constructor() { }

  ngOnInit() {
    this.getSuggustions();
    }

  getSuggustions(){
    this.searchSuggestion = [
      {
        query: 'I want to study marketing in England'
      },
      {
        query: 'Institution that offer medical in Malaysia'
      },
      {
        query: 'I want to study marketing in England'
      },
      {
        query: 'Institution that offer medical in Malaysia'
      },
      {
        query: 'I want to study marketing in England'
      }
    ] 
  }

}

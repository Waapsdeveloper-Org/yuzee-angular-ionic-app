import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-companies-view',
  templateUrl: './companies-view.component.html',
  styleUrls: ['./companies-view.component.scss'],
})
export class CompaniesViewComponent implements OnInit {

  @Input() totalNumbers = null;
  @Input() totalCompanies = [];

  ratingNumber : number = 0;

  constructor(private router:Router,private shared:SharedService) { }

  ngOnInit() {}

  goTocompany(comp) {
    console.log(comp);
    this.shared.companyId = comp.company_id;
    this.router.navigate(['company-profile/homeTab']);
  }

}

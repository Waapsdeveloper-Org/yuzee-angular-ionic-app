import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { AdzunaApiService } from 'yuzee-shared-lib';

import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-jobs-view",
  templateUrl: "./jobs-view.component.html",
  styleUrls: ["./jobs-view.component.scss"],
})
export class JobsViewComponent implements OnInit {
  @Input() searchData;
  showEmpty: boolean = false;

  SearchJobResultObj: any = {};
  SearchJobResult: any = [];
  geoAddress: any;

  constructor(private AdzunaService: AdzunaApiService, public modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.searchData);
    this.getSearchResultJobs();
  }

  getSearchResultJobs() {
    this.AdzunaService.getSearchJobs(this.searchData).then(
      (data: any) => {
        console.log(" data jobs ", data);
        this.SearchJobResultObj = data;
        this.SearchJobResult = data.results;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getJobsRecommendationJobs() {
    this.AdzunaService.getRecommendation(this.geoAddress).then(
      (data: any) => {
        console.log(" data jobs ", data);
        this.SearchJobResultObj = data;
        this.SearchJobResult = data.results;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async jobDetails() {
    const modal = await this.modalCtrl.create({ component: 'JobDetailsComponent' });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
        }
      }
    });
    return await modal.present();
  }
}

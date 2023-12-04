import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { EventInfosComponent } from "./event-infos/event-infos.component";

@Component({
  selector: "app-events-view",
  templateUrl: "./events-view.component.html",
  styleUrls: ["./events-view.component.scss"],
})
export class EventsViewComponent implements OnInit {
  eventJoined: boolean = false;
  @Input() searchData;

  EventArray: any = [];

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.searchData);
  }

  async eventInfo() {
    const modal = await this.modalCtrl.create({ component: EventInfosComponent });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned);
      }
    });
    return await modal.present();
  }
}

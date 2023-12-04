import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-event-infos",
  templateUrl: "./event-infos.component.html",
  styleUrls: ["./event-infos.component.scss"],
})
export class EventInfosComponent implements OnInit {
  constructor(public modalCtrl: ModalController) {}
  eventJoined: boolean = true;
  ngOnInit() {}

  goBack() {
    this.modalCtrl.dismiss();
  }
}

import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-institution-offerings-details",
  templateUrl: "./institution-offerings-details.component.html",
  styleUrls: ["./institution-offerings-details.component.scss"],
})
export class InstitutionOfferingsDetailsComponent implements OnInit {
  @Input("type") type = "";
  @Input("data") detailsArray = [];
  constructor() {}

  ngOnInit() {}
}

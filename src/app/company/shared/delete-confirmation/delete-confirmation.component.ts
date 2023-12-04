import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";

@Component({
  selector: "app-delete-confirmation",
  templateUrl: "./delete-confirmation.component.html",
  styleUrls: ["./delete-confirmation.component.scss"],
})
export class DeleteConfirmationComponent extends CcBasePage implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  close(res) {
    this.ccModalService.dismiss({res});
  }
}

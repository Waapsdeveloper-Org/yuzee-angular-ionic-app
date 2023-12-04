import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MapViewComponent, NearestCourseMapComponent } from "src/app/shared";
import { RecombeeApiServices } from "yuzee-shared-lib";

@Component({
  selector: "app-course-rec",
  templateUrl: "./course-rec.component.html",
  styleUrls: ["./course-rec.component.scss"],
})
export class CourseRecComponent implements OnInit {
  courseRecList: any = [];
  steps = {
    spm: {
      completed: true,
      active: true,
    },
    community: {
      completed: false,
      active: false,
    },
    masters: {
      completed: false,
      active: false,
    },
    psychologist: {
      completed: false,
      active: false,
    },
  };

  constructor(private recombeeServices: RecombeeApiServices, public modalCtrl: ModalController) {}

  ngOnInit() {
    this.getCourseRec();
  }

  getCourseRec() {
    this.recombeeServices.getCoursesRecommendationList().then(
      (data: any) => {
        console.log("== course Rec List ==", data);
        this.courseRecList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async gotomap(result) {
    const modal = await this.modalCtrl.create({
      component: MapViewComponent,
      // component: NearestCourseMapComponent,
      componentProps: { ParamsInstCourse: result },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
        }
      }
    });
    return await modal.present();
  }
}

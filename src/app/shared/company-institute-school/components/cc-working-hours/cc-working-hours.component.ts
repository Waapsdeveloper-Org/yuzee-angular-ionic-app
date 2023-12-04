import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
} from "@angular/core";
import { GenericSearchableRadioSelectionComponent } from "src/app/shared";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";

@Component({
  selector: "app-cc-working-hours",
  templateUrl: "./cc-working-hours.component.html",
  styleUrls: ["./cc-working-hours.component.scss"],
})
export class CcWorkingHoursComponent extends CcBasePage {
  @Output("dayOfWeek") dayOfWeek: EventEmitter<any> = new EventEmitter<any>();
  @Output("toEvent") toEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output("fromEvent") fromEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output("presentPopUpEvent") presentPopUpEvent: EventEmitter<any> =
    new EventEmitter<any>();
  @Output("close") close: EventEmitter<any> = new EventEmitter<any>();
  @Input("showClose") showClose: boolean;
  @Input("isEdit") isEdit = false;
  @Input("submitted") submitted = false;

  timesArray = [
    {
      time_id: 1,
      time_value: "12:00 AM",
    },
    {
      time_id: 2,
      time_value: "12:15 AM",
    },
    {
      time_id: 3,
      time_value: "12:30 AM",
    },
    {
      time_id: 4,
      time_value: "12:45 AM",
    },
    {
      time_id: 5,
      time_value: "01:00 AM",
    },
    {
      time_id: 6,
      time_value: "01:15 AM",
    },
    {
      time_id: 7,
      time_value: "01:30 AM",
    },
    {
      time_id: 8,
      time_value: "01:45 AM",
    },
    {
      time_id: 9,
      time_value: "02:00 AM",
    },
    {
      time_id: 10,
      time_value: "02:15 AM",
    },
    {
      time_id: 11,
      time_value: "02:30 AM",
    },
    {
      time_id: 12,
      time_value: "02:45 AM",
    },
    {
      time_id: 13,
      time_value: "03:00 AM",
    },
    {
      time_id: 14,
      time_value: "03:15 AM",
    },
    {
      time_id: 15,
      time_value: "03:30 AM",
    },
    {
      time_id: 16,
      time_value: "03:45 AM",
    },
    {
      time_id: 17,
      time_value: "04:00 AM",
    },
    {
      time_id: 18,
      time_value: "04:15 AM",
    },
    {
      time_id: 19,
      time_value: "04:30 AM",
    },
    {
      time_id: 20,
      time_value: "04:45 AM",
    },
    {
      time_id: 21,
      time_value: "05:00 AM",
    },
    {
      time_id: 22,
      time_value: "05:15 AM",
    },
    {
      time_id: 23,
      time_value: "05:30 AM",
    },
    {
      time_id: 24,
      time_value: "05:45 AM",
    },
    {
      time_id: 25,
      time_value: "06:00 AM",
    },
    {
      time_id: 26,
      time_value: "06:15 AM",
    },
    {
      time_id: 27,
      time_value: "06:30 AM",
    },
    {
      time_id: 28,
      time_value: "06:45 AM",
    },
    {
      time_id: 29,
      time_value: "07:00 AM",
    },
    {
      time_id: 30,
      time_value: "07:15 AM",
    },
    {
      time_id: 31,
      time_value: "07:30 AM",
    },
    {
      time_id: 32,
      time_value: "07:45 AM",
    },
    {
      time_id: 33,
      time_value: "08:00 AM",
    },
    {
      time_id: 34,
      time_value: "08:15 AM",
    },
    {
      time_id: 35,
      time_value: "08:30 AM",
    },
    {
      time_id: 36,
      time_value: "08:45 AM",
    },
    {
      time_id: 37,
      time_value: "09:00 AM",
    },
    {
      time_id: 38,
      time_value: "09:15 AM",
    },
    {
      time_id: 39,
      time_value: "09:30 AM",
    },
    {
      time_id: 40,
      time_value: "09:45 AM",
    },
    {
      time_id: 41,
      time_value: "10:00 AM",
    },
    {
      time_id: 42,
      time_value: "10:15 AM",
    },
    {
      time_id: 43,
      time_value: "10:30 AM",
    },
    {
      time_id: 44,
      time_value: "10:45 AM",
    },
    {
      time_id: 45,
      time_value: "11:00 AM",
    },
    {
      time_id: 46,
      time_value: "11:15 AM",
    },
    {
      time_id: 47,
      time_value: "11:30 AM",
    },
    {
      time_id: 48,
      time_value: "11:45 AM",
    },
    {
      time_id: 49,
      time_value: "12:00 PM",
    },
    {
      time_id: 50,
      time_value: "12:15 PM",
    },
    {
      time_id: 51,
      time_value: "12:30 PM",
    },
    {
      time_id: 52,
      time_value: "12:45 PM",
    },
    {
      time_id: 53,
      time_value: "01:00 PM",
    },
    {
      time_id: 54,
      time_value: "01:15 PM",
    },
    {
      time_id: 55,
      time_value: "01:30 PM",
    },
    {
      time_id: 56,
      time_value: "01:45 PM",
    },
    {
      time_id: 57,
      time_value: "02:00 PM",
    },
    {
      time_id: 58,
      time_value: "02:15 PM",
    },
    {
      time_id: 59,
      time_value: "02:30 PM",
    },
    {
      time_id: 60,
      time_value: "02:45 PM",
    },
    {
      time_id: 61,
      time_value: "03:00 PM",
    },
    {
      time_id: 62,
      time_value: "03:15 PM",
    },
    {
      time_id: 63,
      time_value: "03:30 PM",
    },
    {
      time_id: 64,
      time_value: "03:45 PM",
    },
    {
      time_id: 65,
      time_value: "04:00 PM",
    },
    {
      time_id: 66,
      time_value: "04:15 PM",
    },
    {
      time_id: 67,
      time_value: "04:30 PM",
    },
    {
      time_id: 68,
      time_value: "04:45 PM",
    },
    {
      time_id: 69,
      time_value: "05:00 PM",
    },
    {
      time_id: 70,
      time_value: "05:15 PM",
    },
    {
      time_id: 71,
      time_value: "05:30 PM",
    },
    {
      time_id: 72,
      time_value: "05:45 PM",
    },
    {
      time_id: 73,
      time_value: "06:00 PM",
    },
    {
      time_id: 74,
      time_value: "06:15 PM",
    },
    {
      time_id: 75,
      time_value: "06:30 PM",
    },
    {
      time_id: 76,
      time_value: "06:45 PM",
    },
    {
      time_id: 77,
      time_value: "07:00 PM",
    },
    {
      time_id: 78,
      time_value: "07:15 PM",
    },
    {
      time_id: 79,
      time_value: "07:30 PM",
    },
    {
      time_id: 80,
      time_value: "07:45 PM",
    },
    {
      time_id: 81,
      time_value: "08:00 PM",
    },
    {
      time_id: 82,
      time_value: "08:15 PM",
    },
    {
      time_id: 83,
      time_value: "08:30 PM",
    },
    {
      time_id: 84,
      time_value: "08:45 PM",
    },
    {
      time_id: 85,
      time_value: "09:00 PM",
    },
    {
      time_id: 86,
      time_value: "09:15 PM",
    },
    {
      time_id: 87,
      time_value: "09:30 PM",
    },
    {
      time_id: 88,
      time_value: "09:45 PM",
    },
    {
      time_id: 89,
      time_value: "10:00 PM",
    },
    {
      time_id: 90,
      time_value: "10:15 PM",
    },
    {
      time_id: 91,
      time_value: "10:30 PM",
    },
    {
      time_id: 92,
      time_value: "10:45 PM",
    },
    {
      time_id: 93,
      time_value: "11:00 PM",
    },
    {
      time_id: 94,
      time_value: "11:15 PM",
    },
    {
      time_id: 95,
      time_value: "11:30 PM",
    },
    {
      time_id: 96,
      time_value: "11:45 PM",
    },
    {
      time_id: 97,
      time_value: "12:00 AM",
    },
  ];

  selectedStartTimeId = -1;
  selectedEndTimeId = -1;
  selectedStartTime = "";
  selectedEndTime = "";

  private nitem: any;

  @Input("item")
  public get item(): any {
    return this.nitem;
  }
  public set item(value: any) {
    this.nitem = value;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(injector: Injector) {
    super(injector);
    console.log("item", this.item);
  }

  selectedDayOfWeek(value: any) {
    this.dayOfWeek.emit(value);
  }

  to(value: any) {
    this.toEvent.emit(value);
  }

  from(value: any) {
    this.fromEvent.emit(value);
  }

  presentPopUp(param: any) {
    this.presentPopUpEvent.emit(param);
  }

  async showTimesModal(type) {

    let arr = Object.assign([], this.timesArray);
    let selected = this.timesArray.find(x => type == "to" ? x.time_id == this.selectedEndTimeId : x.time_id == this.selectedStartTimeId);


    // filter array for each after 15 min of start time if we are selecting end time

    if (type == 'to') {

      let findIndexOfStart = this.timesArray.findIndex(x => x.time_id == this.selectedStartTimeId);

      if (findIndexOfStart != -1) {
        // remove all items previous of that index
        arr = arr.splice(findIndexOfStart + 1, arr.length - 1);
      }
    }

    const res = await this.ccModalService.present(GenericSearchableRadioSelectionComponent, {
      title: type == "to" ? "End TIme" : "Start Time",
      data: arr,
      keyToShow: "time_value",
      selected: selected ? selected.time_value : null,
      showSearch: false
    }, 'generic-medium-popup-modal generic-modal generic-model-backdrops');

    if (res.data && res.data.value) {

      if (type == "to") {
        this.selectedEndTimeId = res.data.value.time_id
        this.selectedEndTime = res.data.value.time_value;
        this.item.close_at = res.data.value.time_value;


      }

      if (type == "from") {
        this.item.close_at = res.data.value.time_value;
        this.item.open_at = res.data.value.time_value;
        this.selectedStartTimeId = res.data.value.time_id
        this.selectedStartTime = res.data.value.time_value;
        if (this.item.close_at !== "" || this.item.close_at) {
          this.item.close_at = "";
        }

      }
    }
  }
}

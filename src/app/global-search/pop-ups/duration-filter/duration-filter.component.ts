import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { rangeV } from 'src/app/library/interfaces/shared-interfaces.interface';


@Component({
  selector: 'app-duration-filter',
  templateUrl: './duration-filter.component.html',
  styleUrls: ['./duration-filter.component.scss'],
})
export class DurationFilterComponent implements OnInit {
  minValue = 0;
  maxValue = 100;
  modalTitle = 'Duration';
  selected_min_value = null;
  selected_max_value = null;

  private ndata: rangeV;

  @Input('title') title: string = '';
  @Input()
  public get data(): rangeV {
    return this.ndata;
  }

  public set data(value: rangeV){
    this.ndata = value;
    this.minValue = this.data.min_value;
    this.maxValue = this.data.max_value;
    this.selected_min_value = this.data.selected_min_value;
    this.selected_max_value = this.data.selected_max_value;
  }


  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {

    this.modalTitle = this.title;

  }

  goBack() {
    this.modalCtrl.dismiss();
  }
  onIonChange(event){
    this.selected_min_value = event.detail.value.lower;
    this.selected_max_value = event.detail.value.upper;
  }

  cancel(){
    this.data.min_value = this.minValue;
    this.data.max_value = this.maxValue;
    this.data.selected_min_value = this.minValue;
    this.data.selected_max_value = this.maxValue;
    this.data.reset = true;

    this.modalCtrl.dismiss(this.data)
  }

  confirmation(){

    this.data.min_value = this.minValue;
    this.data.max_value = this.maxValue;
    this.data.selected_min_value = this.selected_min_value;
    this.data.selected_max_value = this.selected_max_value;
    this.data.reset = false;

    this.modalCtrl.dismiss(this.data)



  }
}

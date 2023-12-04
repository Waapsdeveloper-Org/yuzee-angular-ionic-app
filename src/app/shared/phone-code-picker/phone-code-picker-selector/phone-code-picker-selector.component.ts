import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COUNTRYCODESLIST } from 'src/app/app.constants';
import { CcModalService } from 'src/app/services/cc-modal.service';
import { NgrxService } from 'src/app/services/store/ngrx.service';
import { PhoneCodePickerComponent } from '../phone-code-picker.component';

@Component({
  selector: 'app-phone-code-picker-selector',
  templateUrl: './phone-code-picker-selector.component.html',
  styleUrls: ['./phone-code-picker-selector.component.scss'],
})
export class PhoneCodePickerSelectorComponent implements OnInit {

  @Input() item = { name: 'Australia', flag: '🇦🇺', code: 'AU', dial_code: '+61' };
  @Output('change') change: EventEmitter<any> = new EventEmitter<any>();
  list = [];
  constructor(private modals: CcModalService, private ngrx: NgrxService) { 

    this.ngrx.subscribe("app-generic-searchable-radio-selection:post:search-list", async (data) => {
      
      let title = data.title ? data.title.toLowerCase() : '';
      
      switch(title) {
        case "country code":
          await this.sesrchWithCountryName(data);
          ngrx.publish('app-generic-searchable-radio-selection:get:search-list', this.list );
        break;
      }
      

    });

  }

  sesrchWithCountryName(data){

    return new Promise( resolve => {
      let search = data.search as string;
      if(search){
        this.list = COUNTRYCODESLIST.filter( x => x.name.toLowerCase().includes(search.toLowerCase()))        
      }
      resolve(this.list)
    })
  }

  ngOnInit() {
    this.change.emit(this.item)
  }

  async openSelector(){

    const res = await this.modals.present(PhoneCodePickerComponent, {
      phoneCode: this.item.dial_code,
    }, 'generic-large-popup-modal generic-modal generic-model-backdrops' );
    if (res?.data?.value) {
      this.item = res.data.value;
      this.change.emit(this.item)
    }

  }

}

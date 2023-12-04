import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { NgxPubSubService } from './services/ngx-pub-sub.service';

@Injectable({
  providedIn: 'root'
})
export class NgrxService {

  subscriptions: any[] = [];
  genericModalListSearch = new Subject<any>();
  genericModalListSearchResult = new Subject<any>();
  constructor(private pubsubSvc: NgxPubSubService) { }

  publish(key: string, data = {}) {
    this.pubsubSvc.publishEvent(key, data);
  }

  subscribe(key, handler, unsub = false) {

    // Required code - for item subscription event, will use later
    if(unsub){
      const item = this.subscriptions.find((x) => x.key === key);
      if (item) {
        this.unsubscribeAll(key);
      }
      // this.subscribe[key] = subs;
    }
    

    const subs = this.pubsubSvc.subscribe(key as string, data => handler(data));
    this.subscriptions.push({key,subs});




  }

  publishGenericModalListSearch(_data: any) {
    this.genericModalListSearch.next(_data);
  }

  publishGenericModalListSearchResult(_data: any) {
    this.genericModalListSearchResult.next(_data);
  }

  // Required code - for item subscription event, will use later
  // publishGenericModalListScroll(_data: any) {
  //   this.genericModalListScroll.next(_data);
  // }

  unsubscribe(){
    this.genericModalListSearch.unsubscribe();
    this.genericModalListSearchResult.unsubscribe();
    // this.genericModalListScroll.unsubscribe();
  }

  unsubscribeAll(key) {
    const item = this.subscriptions.find( x => x.key === key);
    if(item){
      const subs = item.subs;
      subs.unsubscribe();

      const index = this.subscriptions.findIndex( x => x.key === key);
      if (index > -1) {
        this.subscriptions.splice(index, 1);
      }


    }

  }
}

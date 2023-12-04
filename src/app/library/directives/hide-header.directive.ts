import {
  Directive,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {


  @Input('appHideHeader') toolbar: any;
  toolbarHeight = 66;

  @HostListener('ionScroll',['$event']) onContentScroll(){

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private domCtrl: DomController){}

  ngOnInit() {
    this.toolbar = this.toolbar.el;
    console.log('test: ' + this.toolbar)

      this.domCtrl.read(()=>{
        this.toolbarHeight = this.toolbar.clientHeight;
      });
  }

}

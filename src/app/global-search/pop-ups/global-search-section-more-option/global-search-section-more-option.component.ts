import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
@Component({
  selector: 'app-global-search-section-more-option',
  templateUrl: './global-search-section-more-option.component.html',
  styleUrls: ['./global-search-section-more-option.component.scss'],
})
export class GlobalSearchSectionMoreOptionComponent implements OnInit {
  website;
  constructor(private clipboard: Clipboard,
    public toastController: ToastController) {
    
   }

  ngOnInit() {}
  copy(){
    this.clipboard.copy(this.website).then(async (res)=>{
      const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Copied to clipboard',
        mode: 'ios'
      });

      await toast.present();
    });
  }
}

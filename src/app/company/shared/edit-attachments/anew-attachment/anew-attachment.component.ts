/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CompanyApiService } from 'yuzee-shared-lib'
import { SharedService } from '../../../../services/shared.service';
import { AboutUsService} from '../../../../../services/aboutUs-service';
import { CompanySelectComponent } from 'src/app/company/popups/company-select';
@Component({
  selector: 'app-anew-attachment',
  templateUrl: './anew-attachment.component.html',
  styleUrls: ['../attachment-item/attachment-item.component.scss','./anew-attachment.component.scss'],
})
export class AnewAttachmentComponent implements OnInit {
 
  constructor(private router: Router,
    private shared: SharedService,
    private companyApi: CompanyApiService,
    private contactServices: AboutUsService,
    private editPopUpModal: ModalController ) { }
    // eslint-disable-next-line @typescript-eslint/member-ordering
    totalItem: any[] = [];
    // eslint-disable-next-line @typescript-eslint/member-ordering
    showTo = "Public";
  goBack()  {
    this.totalItem = [];
    this.router.navigate(['company-profile/aboutTab/contact-details'])
  }

  ngOnInit() {
    this.showTo = this.shared.showTo;
  }


ionViewWillEnter() {  
  this.checkHowManyContactsAre();
}


  async presentModal() {
    let data  = ['Public', 'Private'];
    const modal = await this.editPopUpModal.create({
      
      component: CompanySelectComponent,
      cssClass: 'company-profile-popup ',
      backdropDismiss:true,
      keyboardClose:true,
      showBackdrop:true,
      swipeToClose:true,
      componentProps:{
        data,
        type:null
      }
    });
    modal.onDidDismiss().then((data_n43)=>{
      console.log("DATA FROM MODAL: ", data_n43);
      this.showTo = data_n43.data.data;
    })
    return await modal.present();
  }

  // async openTypePopUp(i) {
  //   const modal = await this.editPopUpModal.create({
  //     componentProps:{
  //       data:[
  //           {name:'Email',value:'"EMAIL"',icon:"",type:'button'},
  //           {name:'Skype',value:'SKYPE',icon:"",type:'button'},
  //           {name:'Phone',value:'PHONE',icon:"",type:'button'}],
  //           type:null
  //     },
  //     component: MediumPopUpComponent,
  //     cssClass: 'medium'
  //   });
  //   modal.onDidDismiss().then((data)=>{
  //     console.log("DATA FROM MODAL: ", data.data.data);
  //     this.totalItem[i].type = data.data.data;
  //   })
  //   return await modal.present();
  // }

  addValue(i,value) {
    console.log("ADD VALUE", i, value);
    this.totalItem[i].value = value;
  }

  checkHowManyContactsAre(){
    let number_of_contacts: number = this.contactServices.contactDetails.length;
    for (let index = 0; index < number_of_contacts; index++) {
      
      this.contactsTemplate(this.contactServices.contactDetails[index]);
      console.log("Object: ", this.contactServices.contactDetails[index])
    }
  }

  contactsTemplate(item){
    let id = item.contact_detail_id;
    this.totalItem.push({id,type:item.contact_type,value:item.value});
  }

  addTemplate() {
    let id =Math.random();
    this.totalItem.push({id,type:'',value:''});
  }

  deleteTemplate(id){
    let itemId: number = id;
    console.log("DELETE CALLED:", id);
    this.totalItem = this.totalItem.filter(x=>x.id !=itemId);
  }

  saveContactDetails(){
    console.log(this.totalItem);
    
    let arr = this.totalItem;
   arr = this.totalItem.map(x=>{
      let obj = {
        contact_detail_id:x.id,
        contact_type: String(x.type).toUpperCase(),
        value:x.value
      }
      return obj;
    })

    let companyId = this.shared.companyId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.companyApi.postCompanyContactDetails(companyId,arr)
    .then((res: any)=>{
      console.log("RESPONSE: ", res);
      this.contactServices.contactDetails = arr;
      
      this.totalItem = [];
      this.goBack();
    })
  }

}

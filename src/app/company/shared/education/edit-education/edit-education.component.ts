import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {CompanyApiService} from 'yuzee-shared-lib'
import { SharedService } from '../../../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss'],
})
export class EditEducationComponent implements OnInit {

  details;
  adding: boolean=false;
  lang: string;
  constructor(private router: Router,
    private shared: SharedService,
    private companyApi: CompanyApiService,
    private route: ActivatedRoute,
    private translate: TranslateService) {
      let booler =  this.route.snapshot.paramMap.get('adding');
      if(booler == 'true'){
        this.adding = true;
      } else {
        this.adding = false;
      }
    }
    

    ngOnInit() {
    }

    save() {
      this.shared.companyInternship.education.paragraph = this.details;
      let obj = {
        education_need:this.details
      };
      console.log("SAVE: ",  this.shared.companyInternship.education.paragraph);
      this.companyApi
      .postCompanyInternshipEducation(obj,this.shared.companyId,this.shared.companyInternship.id)
      .then((res: any)=>{
        console.log("RES: ", res);
        if(res.status == 200){
          this.shared.presentToast(res.message)
          .then(()=>{
            this.router.navigate(['company-profile/company-internship-detail']);
          });
        }
      });
    }

    languageSet(){
      if(localStorage.getItem("Language")){
        this.lang = localStorage.getItem("Language")
        this.translate.use(this.lang);
      }
      else{
        this.translate.setDefaultLang("en");
        localStorage.setItem("Language",'en')
      }
    }

    goBack() {
      this.router.navigate(['company-profile/company-internship-detail/edit-internship',{adding:this.adding}])
    }

}

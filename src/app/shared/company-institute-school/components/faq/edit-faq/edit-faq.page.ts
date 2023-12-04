import { Component, Injector, Input, OnInit } from "@angular/core";
import { MAX_LENGTH } from "src/app/app.constants";
import { CompanyHelperService } from "src/app/services/company-helper.service";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { GenericDescriptionComponent } from "src/app/shared/generic-description/generic-description.component";
import { CommonApiService } from "yuzee-shared-lib";


@Component({
  selector: "app-edit-faq",
  templateUrl: "./edit-faq.page.html",
  styleUrls: ["./edit-faq.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class EditFAQPage extends CcBasePage implements OnInit {

  @Input("profileType") profileType;
  @Input("entityId") entityId;
  isDeleted;

  nfaq: any = {
    title: "",
    description: "",
    keywords: [],

  };

  titleValidated: boolean = false;
  faq: any;
  canSubmit = false;
  submitted: boolean = false;
  suggested: any[] = ["API", "Database", "Database Architecture"];
  _suggested: any[] = ["API", "Database", "Database Architecture"];
  title: any;
  constructor(
    private commonApiService: CommonApiService,
    injector: Injector,
    private commonAPI: CommonApiService,
    private ccHelperService: CompanyHelperService) {
    super(injector);
  }

  ngOnInit() {
    this.submitted = false;
    this.faq = this.shared.clone(this.nfaq);
    if(this.faq.title){
      this.titleValidated = true
    }
    this.faq.entity_id = this.entityId;
    this.faq.entity_type = this.profileType;
  }

  getIfCanSubmit() {
    let checkPoint = [this.faq.description, this.faq.title];
    return checkPoint.every(this.shared.isFilled);
  }

  async dismiss() {
    if (this.canSubmit) {
      const res = await this.ccUtilityService.showConfirmPopOver();

      if (res) {
        this.ccModalService.dismiss();
      }
    } else {
      this.ccModalService.dismiss();
    }
  }

  async openDescriptionModal() {

    const res = await this.ccModalService.present(GenericDescriptionComponent, {
      data: this.faq.description,
      heading: "Answer",
      minLength: MAX_LENGTH.min,
      maxLength: MAX_LENGTH.max,
    }, "modal-full-screen-view", "", "md");
    if (res.data.isSaved) {
      if (res.data.data !== "") {
        this.faq.description = res.data.data;
        this.canSubmit = true;
      }
    }
  }

  async openKeyWordsModal() {

    const resKeyword = await this.ccHelperService.selectKeywords(this.faq.keywords) as any;
    this.faq.keywords = resKeyword.filter( x => x.keyword != null).map( x => x.keyword ? x.keyword : x);
  }

  removeSkill(item, i: number) {
    this.faq.keywords.splice(i, 1);
  }

  async save() {
    this.submitted = true;

    if (!this.titleValidated) {
      return false;
    }
    if (
      !this.faq.title ||
      this.faq.title == "" ||
      !this.faq.description ||
      this.faq.description == ""
    ) {
      return false;
    }
    
    this.faq.title = this.faq.title.trim();
    this.faq.description = this.faq.description.trim();
    this.faq.entity_type = this.profileType;

    let obj = Object.assign({}, this.faq);
    obj.keywords = this.faq.keywords.map( x => x.keyword ? x.keyword : x);
    obj.entity_type = this.profileType;
    let res = !this.faq.faq_id ? await this.commonAPI.addFaqQuestion(obj) as any : await this.commonAPI.updateFaqQuestion(obj, this.faq.faq_id) as any

    if (res.status == 200) {
      this.shared.faqHide.next(false);
      this.getCompanyFaqList();
      this.ccModalService.dismiss({ data: true });
    }
  }

  validateQuestion() {
    return this.faq.title.length > MAX_LENGTH.nameMax || this.faq.title.length < MAX_LENGTH.textMin
      ? false
      : true;
  }

  async deleteFaq() {
    const res = await this.ccUtilityService.showdeleteConfirmPopOver();
    if (res) {
      // eslint-disable-next-line @typescript-eslint/no-shadow, no-shadow
      this.commonAPI.deleteFaqQuestion(this.faq.faq_id).then((res) => {
        if(res)
        {
        this.ccModalService.dismiss();
        this.shared.companyDetailsChanged.next();
        this.getCompanyFaqList();
      }

      });
    }
  }


  selectSuggested(item, index: number) {
    this.canSubmit = true;
    this.suggested.splice(index, 1);
    this.faq.keywords.push(item);
  }

  onKeyUp(errors = null) {
    this.canSubmit = true;

    if (this.handleStringError(errors) == '') {
      this.titleValidated = true;
    } else {
      this.titleValidated = false;
    }
  }

  validateTitle(errors = null) {

    if (this.submitted) {
      return (this.faq.title == '') ? "Please Enter Question" : "";
    } else {
      return this.handleStringError(errors);
    }
  }

  returnFaqLabel(x){
    return x.keyword ? x.keyword : x
  }

  getCompanyFaqList() {
    this.commonApiService
      .getFaqListUsingSearch({
        pageNumber: 1,
        pageSize: 10,
        entityId: this.entityId,
        entityType: this.profileType,
        keyword: "",
      })
      .then((res: any) => {
        this.ngrx.publish("app-profile-faq-list:data-update", {
          data: res.response,
        });
      });
  }
}

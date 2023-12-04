import { Component, Injector, Input, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CommonApiService } from "yuzee-shared-lib";
import { EditFAQPage } from "./edit-faq/edit-faq.page";
import { SeeAllFaqComponent } from "./see-all-faq/see-all-faq.component";
@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
})
export class FaqComponent extends CcBasePage implements OnInit {
  @Input("profileType") profileType;
  @Input("entityId") entityId;
  @Input() hasAccessCreate;
  faqs: any[] = [];
  searchTerm = "";
  hide: boolean;

  constructor(injector: Injector, private commonAPI: CommonApiService) {
    super(injector);

    this.ngrx.subscribe("app-profile-faq-list:data-update", (value: any) => {
      // call API here and then fetch the data
      const data = value.data;
      this.faqs = data;
    })

  }

  ngOnInit() {
    this.searchFAQ("", false, true);
    this.shared.faqHide.subscribe((res) => {this.hide = res;})
  }

  searchFAQ(search, paginate = false, isInitial = false) {
    this.commonAPI.getFaqListUsingSearch({
      pageNumber: 1,
      pageSize: 20,
      entityId: this.entityId,
      entityType: this.profileType,
      keyword: this.searchTerm,
    })
      .then((res: any) => {
        const faqs = res.response.map((x) => {
          let obj = {
            title: "",
            isOpened: false,
            description: "",
            faq_id: "",
            entity_id: "",
            keywords: [],
          };
          obj.title = x.title;
          obj.description = x.description;
          obj.faq_id = x.faq_id;
          obj.entity_id = x.entity_id;
          obj.keywords = x.keywords;
          return obj;
        });
        if (faqs.length > 0) {
          this.shared.faqHide.next(false);
        } else {
          this.shared.faqHide.next(true);
        }

        this.faqs = faqs;
      });
  }

  toggleOpen(i) {
    const openedIndex = this.faqs.findIndex((x) => x.isOpened == true);
    if (openedIndex !== -1) {
      this.faqs[openedIndex].isOpened = false;
      if (openedIndex !== i) {
        this.faqs[i].isOpened = true;
      }
    } else {
      this.faqs[i].isOpened = true;
    }
  }

  async openFAQAdd() {
    await this.ccModalService.present(EditFAQPage, { profileType: this.profileType, entityId: this.entityId }, "modal-full-screen-view", "right", "md");
  }

  async editFAQ(item) {
    await this.ccModalService.present(EditFAQPage, {
      item,
      nfaq: item,
      canSubmit: false,
      profileType: this.profileType,
      entityId: this.entityId
    }, "modal-full-screen-view", "right", "md");
  }

  seemore() {
    this.ccModalService.present(SeeAllFaqComponent, { profileType: this.profileType, entityId: this.entityId }, "modal-full-screen-view", "right", "md");
  }
}

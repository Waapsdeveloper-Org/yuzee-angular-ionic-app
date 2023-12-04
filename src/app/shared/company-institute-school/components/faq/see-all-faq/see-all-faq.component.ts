import { Component, Injector, Input, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CommonApiService } from "yuzee-shared-lib";
import { EditFAQPage } from "../edit-faq/edit-faq.page";
import { GenericDeleteConfirmationComponent } from "src/app/shared/generic-delete-confirmation/generic-delete-confirmation.component";

@Component({
  selector: "app-see-all-faq",
  templateUrl: "./see-all-faq.component.html",
  styleUrls: ["./see-all-faq.component.scss"],
})
export class SeeAllFaqComponent extends CcBasePage implements OnInit {
  
  @Input("profileType") profileType;
  @Input("entityId") entityId;

  total_pages = 0;
  page_number = 0;
  page = 1;
  limit = 1;
  searchTerm = "";
  hide: boolean;
  faqs: any[] = [];
  faq: any;
  constructor(injector: Injector, private commonAPI: CommonApiService) {
    super(injector);

    this.ngrx.subscribe("app-profile-faq-list:data-update", (value: any) => {
      const data = value.data;
      this.faqs = data;
    });
  }

  ngOnInit() {
    this.searchFAQ("", false, true);
  }

  searchFAQ(search, paginate = false, isInitial = false) {
    this.commonAPI
      .getFaqListUsingSearch({
        pageNumber: this.page,
        pageSize: 10,
        entityId: this.entityId,
        entityType: this.profileType,
        keyword: this.searchTerm,
      })
      .then((res: any) => {
        this.total_pages = res.total_pages;
        this.page_number = res.page_number;
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

        if (isInitial) {
          if (faqs.length > 0) {
            this.hide = false;
          } else {
            this.hide = true;
          }
        }
        if (!paginate) {
          this.faqs = [].concat(faqs);
        } else if (paginate) {
          this.faqs = this.faqs.concat(faqs);
        }
        if (res.total_count == this.faqs.length) {
          this.limit = -1;
        } else {
          this.limit = 1;
        }
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

  dismiss() {
    this.ccModalService.dismiss();
  }
  async delete() {
    const res = await this.ccModalService.present(
      GenericDeleteConfirmationComponent,
      {},
      "generic-small-popup-modal generic-modal generic-model-backdrops"
    );
    if (res) {
      this.commonAPI.deleteFaqQuestion(this.faq.faq_id).then(() => {
        this.shared.companyDetailsChanged.next();
        this.ccModalService.dismiss();
      });
    }
  }

  onSearchType($event) {
    this.searchTerm = $event;
    if (this.searchTerm.length > 0) {
      this.searchFAQ(this.searchTerm);
    }
    if (this.searchTerm.length == 0) {
      this.searchTerm = "";
      this.searchFAQ(this.searchTerm);
    }
  }

  seemore() {
    if (this.page_number < this.total_pages) {
      this.page++;
      this.searchTerm = "";
      this.searchFAQ(this.searchTerm, true);
    }
  }

  loadMore($event) {
    this.seemore();
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }
}

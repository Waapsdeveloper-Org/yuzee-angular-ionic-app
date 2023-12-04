import { Injector } from "@angular/core";
import { SharedService } from "src/app/services/shared.service";
import { CcNavService } from "src/app/services/cc-nav.service";
import { CcModalService } from "src/app/services/cc-modal.service";
import { FormBuilder } from "@angular/forms";
import { CcPhotosService } from "src/app/services/cc-photos.service";
import { CcStringService } from "src/app/services/cc-string.service";
import { CcUtilityService } from "src/app/services/cc-utility.service";
import { ListModalService } from "src/app/services/listModal.service";
import { FormErrorsService } from "src/app/services/form-errors.service";
import { NgrxService } from "src/app/services/store/ngrx.service";
import { ClassTranslateService } from "src/app/services/class-translate.service";
import { StorageService } from "src/services/storage-service";
import { Platform } from "@ionic/angular";

export abstract class CcBasePage {
  public ccNavService: CcNavService;
  public shared: SharedService;
  public ccModalService: CcModalService;
  public platform: Platform
  public ccLogoService: CcPhotosService;
  public ccStringService: CcStringService;
  public ccUtilityService: CcUtilityService;
  public formBuilder: FormBuilder;
  public listModalService: ListModalService;
  public formErrorsService: FormErrorsService;
  public classTranslateService: ClassTranslateService;
  public ngrx: NgrxService;
  public nativeApi: StorageService;

  constructor(injector: Injector) {
    this.ccModalService = injector.get(CcModalService);
    this.ccNavService = injector.get(CcNavService);
    this.ccStringService = injector.get(CcStringService);
    this.ccLogoService = injector.get(CcPhotosService);
    this.ccUtilityService = injector.get(CcUtilityService);
    this.shared = injector.get(SharedService);
    this.formBuilder = injector.get(FormBuilder);
    this.listModalService = injector.get(ListModalService);
    this.formErrorsService = injector.get(FormErrorsService);
    this.classTranslateService = injector.get(ClassTranslateService);
    this.ngrx = injector.get(NgrxService);
    this.nativeApi = injector.get(StorageService);

  }

  goBack() {
    this.ccNavService.pop();
  }


  handleStringError(value) {
    if (typeof value === 'string' || value instanceof String) {
      return value;
    } else {
      return ''
    }

  }
}

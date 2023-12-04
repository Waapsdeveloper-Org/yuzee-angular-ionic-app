import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Certificates } from 'src/app/app.constants';
import { CcBasePage } from 'src/app/shared/cc-base-page/cc-base-page';
import { ToastService } from 'src/services/toast.service';
import { CommonLogicService } from 'yuzee-shared-lib';

@Component({
  selector: 'app-provider-code',
  templateUrl: './provider-code.component.html',
  styleUrls: ['./provider-code.component.scss'],
})
export class ProviderCodeComponent extends CcBasePage implements OnInit {
  @ViewChild('childFormGroup') childFormGroup: NgForm;

  @Input("item") item;
  @Input("showClose") showClose: boolean;
  @Input() formGroup: FormGroup;
  @Output("close") close: EventEmitter<any> = new EventEmitter<any>();
  @Output("presentPopUpEvent") presentPopUpEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output("providerType") providerType: EventEmitter<any> = new EventEmitter<any>();
  @Output("providerCodeValue") providerCodeValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() isAddMoreButton = new EventEmitter<boolean>();

  isFileUploaded = false;
  newAttachmentObj: any = {}
  fileTypes = Certificates;
  maxLength: number;
  validateObj: any;

  constructor(
    injector: Injector, private fb: FormBuilder,
    private commonLogicService: CommonLogicService,
    private toastService: ToastService) { super(injector); }

  ngOnInit() {
    this.validateObj = this.commonLogicService.getValidationAfterAddProvider();
  }

  presentPopUp(param: any) {
    this.presentPopUpEvent.emit(param);
  }

  selectedCode(value: any) {
    this.providerCodeValue.emit(value);
    this.checkFormValidity();
  }

  selectedProviderType(value: any) {
    this.providerType.emit(value);
    this.getAndAssignMaxLength(value);
    this.checkValidation();
  }

  uploadHandler(files, input, type) {

    let pickedFile: File = files.item(0);
    let ext = "." + pickedFile.name.split(".").pop();

    if (this.fileTypes.includes(ext.toUpperCase()) || this.fileTypes.includes(ext.toLowerCase())) {
      if (pickedFile.size <= 5000000) {
        this.newAttachmentObj.certificate = pickedFile;
        this.newAttachmentObj.original_file_name = pickedFile.name;
        this.newAttachmentObj.file_type = pickedFile.type;
        this.newAttachmentObj.subType = type;
        this.newAttachmentObj = {};
        input.value = "";
      }
      else {
        this.toastService.presentToast(`File ${pickedFile.name} should be less than 5mb`);
        files = "";
      }
    }
    else {
      let strAr = [...this.fileTypes].join(',')
      this.toastService.presentToast(`Allowed file types: ${strAr}`);
    }

  }

  getAndAssignMaxLength(name) {
    this.maxLength = this.commonLogicService.getAndAssignMaxLength(name);
  }

  /** used to check code duplication and enable disable add code button */
  checkValidation(type?: any, code?: any) {
    this.commonLogicService.validateCodeAndCheckDuplication(type, code, this.shared.createInstitution[0].provider_codes);
    this.validateObj = this.commonLogicService.getValidationAfterCheckDuplication();
  }

  uploadDocs(event)
  {
    if(event)
    {
      this.isFileUploaded = true;
    }
  }

  ngChange() {
    let result = this.checkFormValidity();
    if (result) {
      this.isAddMoreButton.emit(result);
      this.shared.isAddMoreCode.next(result);
    }
  }

  checkFormValidity(): boolean {
    return this.childFormGroup?.valid;
  }
}
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/utilities/data-service/data-service.service';
import { PersonalInformationModel } from '../entities/personal-information.model';
import { FormBuilderConstants } from '../form-builder.constants';

@Component({
  selector: 'personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent {
  languages: Array<string> = new Array<string>();
  languagesChecked: Array<boolean> = new Array<boolean>();
  otherLanguageChecked: boolean = false;
  otherLanguage: string = "";
  generalInformation: string = "";
  openAddQuestionModal: boolean = false;
  showDetails: boolean = false;

  // Validations...
  generalInformationError: boolean = false;
  languagesCheckedError: boolean = false;
  otherLanguageBlankError: boolean = false;

  personalInformationObject: PersonalInformationModel = new PersonalInformationModel();
  questionDetails: Array<any> = new Array<any>();

  constructor(private ds: DataService) {
    this.ds.call(FormBuilderConstants.DummyData.LANGUAGES, "GET").subscribe(response => {
      if (response && response.languages) {
        this.languages = response.languages;
        this.languagesChecked = new Array<boolean>(this.languages.length).fill(false);
      }
    });
  }

  onQuestionModalClosed(value: any) {
    this.toggleOpenAddQuestionModal(value.modalOpen);
    this.questionDetails.push(value.question);
  }

  toggleOpenAddQuestionModal(value: boolean) {
    this.openAddQuestionModal = value;
  }

  reviewAnswer() {
    this.validate();

    if (!this.generalInformationError && !this.languagesCheckedError && !this.otherLanguageBlankError) {
      this.personalInformationObject = new PersonalInformationModel();
      this.personalInformationObject.generalInformation = this.generalInformation;
      
      for (let i = 0; i < this.languagesChecked.length; i++) {
        if (this.languagesChecked[i]) {
          this.personalInformationObject.languages.push(this.languages[i]);
        }
      }
  
      if (this.otherLanguageChecked && this.otherLanguage.trim() != "") {
        this.personalInformationObject.languages.push(this.otherLanguage);
      }
  
      this.showDetails = true;
    }
  }

  checkGeneralInformation(event: Event) {
    let value = (event.target as HTMLInputElement).value;

    if (value != null && value.trim() != "") {
      this.generalInformationError = false;
    }
  }

  checkLanguages() {
    setTimeout(() => {
      for (let i = 0; i < this.languagesChecked.length; i++) {
        if (this.languagesChecked[i] || this.otherLanguageChecked) {
          this.languagesCheckedError = false;
        }
      }
    });
  }

  checkOtherLanguages() {
    if (!this.otherLanguageChecked || this.otherLanguageChecked && this.otherLanguage != null && this.otherLanguage.trim() != "") {
      this.otherLanguageBlankError = false;
    }
  }

  validate() {
    if (this.generalInformation == null || this.generalInformation.trim() == "") {
      this.generalInformationError = true;
    }

    let checkLanguagesError: boolean = true;
    for (let i = 0; i < this.languagesChecked.length; i++) {
      if (this.languagesChecked[i] || this.otherLanguageChecked) {
        checkLanguagesError = false;
      }
    }

    if (checkLanguagesError) {
      this.languagesCheckedError = true;
    }

    if (this.otherLanguageChecked && (this.otherLanguage == null || this.otherLanguage.trim() == "")) {
      this.otherLanguageBlankError = true;
    }
  }
}

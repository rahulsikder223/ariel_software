import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/utilities/data-service/data-service.service';

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

  constructor(private ds: DataService) {
    this.ds.call("assets/seed-data/languages.seed.json", "GET").subscribe(response => {
      if (response && response.languages) {
        this.languages = response.languages;
        this.languagesChecked = new Array<boolean>(this.languages.length).fill(false);
      }
    });
  }

  toggleOpenAddQuestionModal(value: boolean) {
    this.openAddQuestionModal = value;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { QuestionModalComponent } from './question-modal/question-modal.component';
import { DataService } from '../utilities/data-service/data-service.service';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewDetailsComponent } from './view-details/view-details.component';

@NgModule({
  declarations: [
    PersonalInformationComponent,
    QuestionModalComponent,
    ViewDetailsComponent
  ],
  imports: [
    CommonModule,
    FormBuilderRoutingModule,
    FormsModule,
    NgbDropdownModule
  ],
  providers: [
    DataService
  ]
})
export class FormBuilderModule { }

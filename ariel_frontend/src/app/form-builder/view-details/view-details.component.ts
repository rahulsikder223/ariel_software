import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonalInformationModel } from '../entities/personal-information.model';

@Component({
  selector: 'view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  @Input() personalInformation: PersonalInformationModel | undefined;
  @Input() questions: Array<any> | undefined;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();

  goBack(): void {
    this.back.emit(false);
  }
}

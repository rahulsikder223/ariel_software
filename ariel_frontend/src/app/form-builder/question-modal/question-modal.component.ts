import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/utilities/data-service/data-service.service';

@Component({
  selector: 'question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent implements OnChanges {
  @ViewChild("content") content: any;
  @Input() openModal: boolean = false;
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();

  questionTypes: Array<string> = new Array<string>();
  selectedType: string = "";

  constructor(private modalService: NgbModal, private ds: DataService) {
    this.ds.call("assets/seed-data/questions.seed.json", "GET").subscribe(response => {
      if (response) {
        this.questionTypes = response.types;
        if (this.questionTypes.length > 0) {
          this.selectedType = this.questionTypes[0];
        }
      }
    });
  }

  ngOnChanges() {
    if (this.openModal) {
      this.modalService.open(this.content);
    }
    else {
      this.modalService.dismissAll();
    }
  }

  closeModal() {
    this.closed.emit(false);
  }
}

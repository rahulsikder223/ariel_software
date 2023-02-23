import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/utilities/data-service/data-service.service';
import { MultipleChoiceQuestion, ParagraphQuestion } from '../entities/question.model';
import { FormBuilderConstants } from '../form-builder.constants';

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
  question: string = "";
  answer: string = "";
  options: Array<any> = Array<any>();
  allowUserAnswer: boolean = false;
  isFieldRequired: Boolean = false;
  questionObject: any;

  constructor(private modalService: NgbModal, private ds: DataService) {
    this.initOptions();
    this.ds.call(FormBuilderConstants.DummyData.QUESTIONTYPES, "GET").subscribe(response => {
      if (response) {
        this.questionTypes = response.types;
        if (this.questionTypes.length > 0) {
          this.selectedType = this.questionTypes[0];
        }
      }
    });
  }

  init() {
    if (this.questionTypes.length > 0) {
      this.selectedType = this.questionTypes[0];
    }
    this.question = "";
    this.answer = "";
    this.initOptions();
    this.allowUserAnswer = false;
    this.isFieldRequired = false;
  }

  initOptions() {
    this.options = new Array<string>();
    this.options.push({ value: "", correct: false });
    this.options.push({ value: "", correct: false });
  }

  ngOnChanges() {
    if (this.openModal) {
      this.modalService.open(this.content);
    }
    else {
      this.init();
      this.modalService.dismissAll();
    }
  }

  updateOptionText(event: Event, i: number) {
    this.options[i] = (event.target as HTMLInputElement).value;
  }

  closeModal() {
    this.closed.emit({ modalOpen: false, question: this.questionObject });
  }

  addOption() {
    if (this.options.length < 5) {
      this.options.push({ value: "", correct: false });
    }
  }

  saveQuestion() {
    if (this.selectedType == FormBuilderConstants.QuestionTypes.PARAGRAPH) {
      this.questionObject = new ParagraphQuestion();
      this.questionObject.type = FormBuilderConstants.QuestionTypes.PARAGRAPH;
      this.questionObject.body = this.question;
      this.questionObject.answer = this.answer;
    }
    else if (this.selectedType == FormBuilderConstants.QuestionTypes.MULTIPLECHOICE) {
      this.questionObject = new MultipleChoiceQuestion();
      this.questionObject.type = FormBuilderConstants.QuestionTypes.MULTIPLECHOICE;
      this.questionObject.body = this.question;
      this.questionObject.options = this.options.map(x => x.value);
      this.questionObject.correctOptions = this.options.map(x => x.correct);
    }

    this.closeModal();
  }
}

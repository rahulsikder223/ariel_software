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

  // Validations...
  questionError: boolean = false;
  answerError: boolean = false;
  optionsError: Array<any> = new Array<any>();

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

    this.optionsError = new Array<any>();
    this.optionsError.push({ value: false });
    this.optionsError.push({ value: false });
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
      this.optionsError.push({ value: false });
    }
  }

  saveQuestion() {
    let validationSuccess = this.validate();
    if (validationSuccess) {
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

  checkOptions(i: number) {
    setTimeout(() => {
      if (this.options[i].value != null && this.options[i].value.trim() != "") {
        this.optionsError[i].value = false;
      }
    });
  }

  checkQuestion() {
    setTimeout(() => {
      if (this.question != null && this.question.trim() != "") {
        this.questionError = false;
      }
    });
  }

  checkAnswer() {
    setTimeout(() => {
      if (this.answer != null && this.answer.trim() != "") {
        this.answerError = false;
      }
    });
  }

  validate() {
    let validationSuccess: boolean = true;

    if (this.question == null || this.question.trim() == "") {
      this.questionError = true;
      validationSuccess = false;
    }

    if (this.selectedType == FormBuilderConstants.QuestionTypes.PARAGRAPH
      && (this.answer == null || this.answer.trim() == "")) {
      this.answerError = true;
      validationSuccess = false;
    }

    if (this.selectedType == FormBuilderConstants.QuestionTypes.MULTIPLECHOICE) {
      for (let i = 0; i < this.optionsError.length; i++) {
        if (this.options[i].value == null || this.options[i].value.trim() == "") {
          this.optionsError[i].value = true;
          validationSuccess = false;
        }
      }
    }

    return validationSuccess;
  }
}

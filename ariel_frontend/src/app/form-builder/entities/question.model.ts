export class ParagraphQuestion {
    type: string = "";
    body: string = "";
    answer: string = "";
}

export class MultipleChoiceQuestion extends ParagraphQuestion {
    options: Array<string> = new Array<string>();
    correctOptions: Array<boolean> = new Array<boolean>();
}
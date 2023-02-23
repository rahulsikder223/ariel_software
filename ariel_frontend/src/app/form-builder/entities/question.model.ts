export interface ParagraphQuestion {
    type: string;
    body: string;
    answer: string;
}

export interface MultipleChoiceQuestion extends ParagraphQuestion {
    options: Array<string>;
}
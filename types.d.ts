export interface Chapter {
  name: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
}

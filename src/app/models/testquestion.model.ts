import { QuestionModel } from './question.model';

export class TestQuestionModel {
  constructor(
    public questionId: number,
    public testId: number,

    public Question: QuestionModel = {} as QuestionModel
  ) {
  }
}

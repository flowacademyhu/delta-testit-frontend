import { TestQuestionModel } from './testquestion.model';
import { TestModel } from './test.model';

export class ResultModel {
  constructor(
    public id: number,
    public testId: number,
    public userId: number,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date,

    public TestQuestions: TestQuestionModel[],
    public Test: TestModel
  ) {
  }
}

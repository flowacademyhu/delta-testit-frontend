import { QuestionModel } from './question.model';


export class TestModel {
  constructor(
    public id: number,
    public name: string,
    public userId: number,
    public answerId: number,
    public createdAt: Date,
    public updatedAt: Date,
    public questions?: QuestionModel[]
  ) {
  }
}

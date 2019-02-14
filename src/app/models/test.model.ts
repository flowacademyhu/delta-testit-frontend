import { QuestionModel } from './question.model';
import { SubjectModel } from './subject.model';
import { TestQuestionModel } from './testquestion.model';
import { UserModel } from './user.model';


export class TestModel {
  constructor(
    public id: number,
    public name: string,
    public userId: number,
    public answerId: number,
    public time: number,
    public createdAt: Date,
    public updatedAt: Date,
    public questions?: QuestionModel[],

    public subject?: SubjectModel,
    public TestQuestions?: TestQuestionModel[],
    public status?: string,
    public User?: UserModel
  ) {
  }
}

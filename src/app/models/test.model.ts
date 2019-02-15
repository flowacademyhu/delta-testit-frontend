import { QuestionModel } from './question.model';
import { SubjectModel } from './subject.model';
import { TestQuestionModel } from './testquestion.model';
import { UserModel } from './user.model';


export class TestModel {
  constructor(
    public id: number,
    public name: string,
    public userId: number,
    public creator: string,
    public answerId: number,
    public time: number,
    public createdAt: Date,
    public updatedAt: Date,
    public questions?: QuestionModel[],

    public subject?: string,
    public TestQuestions?: TestQuestionModel[],
    public User?: UserModel,
    public status?: string
  ) {
  }

  getSubject() {
    return this.TestQuestions[0] ? this.TestQuestions[0].Question.Subject.name : '';
  }

  getStudent() {
    return this.User.firstName + this.User.lastName;
  }
}



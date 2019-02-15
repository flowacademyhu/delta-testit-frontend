import { AnswerModel } from './answer.model';
import { SubjectModel } from './subject.model';

export enum Status {
  PUBLISHED,
  PROCESSING,
  CLOSED
}

export class QuestionModel {
  constructor(
    public id: number,
    public subjectId: number,
    public text: string,
    public picture: string,
    public type: string,
    public value: number,
    public status: Status,
    public createdAt?: Date,
    public updatedAt?: Date,

    public answers?: AnswerModel[],
    public Subject?: SubjectModel
  ) {
  }
}

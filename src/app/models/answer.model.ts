export class AnswerModel {
  constructor(
    public id: number,
    public questionId: number,
    public subjectId: number,
    public text: string,
    public isCorrect: boolean,
    public picture?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {
  }
}

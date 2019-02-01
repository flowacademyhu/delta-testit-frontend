export class QuestionModel {
  constructor(
    public id: number,
    public subjectId: number,
    public questionText: string,
    public level: number,
    public type: string,
    public value: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {
  }
}

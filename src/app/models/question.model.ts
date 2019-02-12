enum Status {
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
    public createdAt: Date,
    public updatedAt: Date
  ) {
  }
}

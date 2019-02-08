export enum Subject {
  Linux = 1,
  Progalamok = 2,
  Progtetelek = 3,
  Git = 4,
  Java = 5,
  Express = 6,
  NodeJs = 7,
  Angular = 8
}

enum Status {
  PUBLISHED,
  PROCESSING,
  CLOSED
}

export class QuestionModel {
  constructor(
    public id: number,
    public subjectId: Subject,
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

export class GroupModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public picture?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
  }
}

export class UserModel {
  constructor(
    public id: number,
    public role: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public encryptedPassword: string,
    public groupId: number,
    public lastLoginAt: Date,
    public createdAt: Date,
    public updatedAt: Date
  ) {
  }
}

enum Role {
  admin,
  mentor,
  student
}

export class UserModel {
  constructor(
    public id: number,
    public role: Role,
    public firstName: string,
    public lastName: string,
    public email: string,
    public picture: string,
    public encryptedPassword: string,
    public groupId: number,
    public lastLoginAt: Date,
    public createdAt: Date,
    public updatedAt: Date
  ) {
  }

}

import { Role } from './role';


export class UserModel {
  constructor(
    public id: number,
    public role: Role,
    public firstName: string,
    public lastName: string,
    public email: string,
    public picture: string,
    public password: string,
    public groupId: number,
    public lastLoginAt: Date,
    public createdAt: Date,
    public updatedAt: Date,
    public token: string
  ) {
  }
}

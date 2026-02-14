export class User {
  constructor(
    public readonly idL: string,
    public readonly name: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

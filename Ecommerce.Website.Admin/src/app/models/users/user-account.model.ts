export class UserAccount {
  private id: string;
  private username: string;
  private password: string;

  constructor(id: string, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public setPassword(password: string) {
    this.password = password;
  }
}

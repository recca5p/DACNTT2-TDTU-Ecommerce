import { UserRole } from './user-role.model';
import { UserAccount } from './user-account.model';
export class UserAccountInfo extends UserAccount {
  private id: string;
  private fullname: string;
  private avatar: string;
  private balance: number;
  private email: string;
  private phone: string;
  private createdDate: Date;
  private updatedDate: Date;
  private roles: UserRole[];
  private enabled: boolean;
  private active: boolean;
  private authorities: any; //Authorities only temp varieble
  private accountNonLocked: boolean;
  private accountNonExpired: boolean;
  private credentialsNonExpired: boolean;

  constructor(
    id: string,
    username: string,
    password: string,
    fullname: string,
    avatar: string,
    balance: number,
    email: string,
    phone: string,
    createdDate: Date,
    updatedDate: Date,
    roles: UserRole[],
    enabled: boolean,
    active: boolean,
    authorities: any,
    accountNonLocked: boolean,
    accountNonExpired: boolean,
    credentialsNonExpired: boolean
  ) {
    super(username, password);
    this.id = id;
    this.fullname = fullname;
    this.avatar = avatar;
    this.balance = balance;
    this.email = email;
    this.phone = phone;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.roles = roles;
    this.enabled = enabled;
    this.active = active;
    this.authorities = authorities;
    this.accountNonLocked = accountNonLocked;
    this.accountNonExpired = accountNonExpired;
    this.credentialsNonExpired = credentialsNonExpired;
  }
}

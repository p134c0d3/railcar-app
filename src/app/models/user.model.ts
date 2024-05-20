export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  password?: string;
  password_confirmation?: string;

  constructor(id: number, email: string, first_name: string, last_name: string, user_type: string, password: string, password_confirmation: string) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_type = user_type;
    this.password = password;
    this.password_confirmation = password_confirmation;
  }

}

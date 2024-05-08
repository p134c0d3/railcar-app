export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;

  constructor(id: number, email: string, first_name: string, last_name: string, user_type: string) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_type = user_type;
  }

}

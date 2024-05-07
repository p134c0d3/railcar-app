export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  user_type: string;

  constructor(user: User) {
    this.id = user.id || 0;
    this.email = user.email || '';
    this.first_name = user.first_name || '';
    this.last_name = user.last_name || '';
    this.password = user.password || '';
    this.password_confirmation = user.password_confirmation || '';
    this.user_type = user.user_type || '';
  }
}




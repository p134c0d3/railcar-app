export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  user_type: string;
}

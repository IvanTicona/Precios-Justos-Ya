export interface User {
  id: string;
  email: string;
  role: 'cliente' | 'alcaldía';
  token: string;
  password: string;
}

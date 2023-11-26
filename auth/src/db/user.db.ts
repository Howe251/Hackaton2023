export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

const users: IUser[] = [
  {
    id: 1,
    name: 'Anonymous',
    email: 'cyber@sec.com',
    password: '12345678',
  }
];

function getUserByEmail(email: string): IUser | undefined {
  return users.find(user => user.email === email);
}

function isCorrectPassword(user: IUser, password: string): boolean {
  return user.password === password;
}

export const userDb = {
  getUserByEmail,
  isCorrectPassword,
}

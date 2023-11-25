export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}
declare function getUserByEmail(email: string): IUser | undefined;
declare function isCorrectPassword(user: IUser, password: string): boolean;
export declare const userDb: {
    getUserByEmail: typeof getUserByEmail;
    isCorrectPassword: typeof isCorrectPassword;
};
export {};

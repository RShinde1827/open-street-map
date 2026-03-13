export interface User {
    users: UserData[];
}

export interface UserData {
    email: string;
    password: string;
    name: string;
}
export enum UserStatus {
    None = 0,
    Pending = 1,
    Active = 2,
    Admin = 3,
}


export interface UserInformation {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    status: UserStatus;
    loginDiscord?: string;
    loginGithub?: string;
    loginFt?: string;
    emailFacebook?: string;
    emailGoogle?: string;
}

export interface UserUpdatePassword {
    oldPassword: string;
    password: string;
    password_confirmation: string;
}
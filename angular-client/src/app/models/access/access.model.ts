/**
 * UserDetails Model
 */
export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
}

/**
 * TokenUser Model
 */
export interface TokenUser {
    token: string;
}

/**
 * User Model
 */
export interface User {
    from: string;
    data: UserData;
    at: string;
    token: string;
    track: number;
}

/**
 * UserData Model
 */
export interface UserData {
    username: string;
    password: string;
    platform: string;
}
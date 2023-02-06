
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginUser {
    login: string;
    password: string;
}

export class NewUser {
    name?: Nullable<string>;
    lastName?: Nullable<string>;
    patronymic?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    age?: Nullable<number>;
    avatarUrl?: Nullable<string>;
    userRate?: Nullable<number>;
    role: string;
    classId: string;
}

export class NewClass {
    number: number;
    letter: string;
    classRate: number;
}

export class NewComplex {
    mo?: Nullable<number>;
    tu?: Nullable<number>;
    we?: Nullable<number>;
    th?: Nullable<number>;
    fr?: Nullable<number>;
}

export class User {
    id: string;
    name: string;
    lastName: string;
    patronymic: string;
    password: string;
    email: string;
    phoneNumber: string;
    age: number;
    avatarUrl?: Nullable<string>;
    dateOfCreation?: Nullable<string>;
    userRate: number;
    role: string;
    classId: string;
    class?: Nullable<Class>;
}

export class SecureUser {
    id: string;
    role: string;
}

export class Token {
    token: string;
}

export class Class {
    id: string;
    number: number;
    letter: string;
    classRate: number;
}

export class Complex {
    id: string;
    orders: number[];
    dateOfCreation?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract me(): User | Promise<User>;

    abstract classes(): Class[] | Promise<Class[]>;

    abstract class(id: string): Nullable<Class> | Promise<Nullable<Class>>;

    abstract myClass(): Class | Promise<Class>;

    abstract validUser(): boolean | Promise<boolean>;

    abstract getComplexesByUserId(): Complex[] | Promise<Complex[]>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract createClass(input?: Nullable<NewClass>): Class | Promise<Class>;

    abstract registerUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract loginUser(input?: Nullable<LoginUser>): Token | Promise<Token>;

    abstract createComplex(input?: Nullable<NewComplex>): Complex | Promise<Complex>;
}

type Nullable<T> = T | null;

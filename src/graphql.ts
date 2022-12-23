
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    classId: string;
}

export class NewClass {
    number: number;
    letter: string;
    classRate: number;
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
    classId: string;
}

export class Class {
    id: string;
    number: number;
    letter: string;
    classRate: number;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract classes(): Class[] | Promise<Class[]>;

    abstract class(id: string): Nullable<Class> | Promise<Nullable<Class>>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract createClass(input?: Nullable<NewClass>): Class | Promise<Class>;
}

type Nullable<T> = T | null;

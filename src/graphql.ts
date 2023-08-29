
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewCategory {
    name: string;
    productIds?: Nullable<Nullable<number>[]>;
}

export class NewProduct {
    photoUrl?: Nullable<string>;
    categoryIds?: Nullable<Nullable<number>[]>;
    name?: Nullable<string>;
    weight?: Nullable<number>;
    price?: Nullable<number>;
    isComplex?: Nullable<boolean>;
    hidden?: Nullable<boolean>;
    calories?: Nullable<number>;
    fats?: Nullable<number>;
    carbohydrates?: Nullable<number>;
    proteins?: Nullable<number>;
}

export class NewComplexModel {
    hide?: Nullable<boolean>;
    productIds?: Nullable<Nullable<number>[]>;
}

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
    roleId: number;
    classId: number;
    balance: number;
    login?: Nullable<string>;
}

export class NewClass {
    number: number;
    letter: string;
    classRate: number;
}

export class NewComplex {
    moId: number;
    tuId: number;
    weId: number;
    thId: number;
    frId: number;
}

export class NewRole {
    name: string;
}

export class User {
    id: number;
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
    balance: number;
    role: string;
    classId: number;
    class?: Nullable<Class>;
    login?: Nullable<string>;
}

export class SecureUser {
    id: number;
    role: Role;
}

export class Token {
    token: string;
}

export class Class {
    id: number;
    number: number;
    letter: string;
    classRate: number;
}

export class Category {
    id?: Nullable<number>;
    name?: Nullable<string>;
    products?: Nullable<Nullable<Product>[]>;
}

export class Product {
    id?: Nullable<number>;
    photoUrl?: Nullable<string>;
    categorys?: Nullable<Nullable<Category>[]>;
    name?: Nullable<string>;
    weight?: Nullable<number>;
    price?: Nullable<number>;
    isComplex?: Nullable<boolean>;
    hidden?: Nullable<boolean>;
    calories?: Nullable<number>;
    fats?: Nullable<number>;
    carbohydrates?: Nullable<number>;
    proteins?: Nullable<number>;
    complexModels?: Nullable<Nullable<ComplexModel>[]>;
}

export class ComplexModel {
    id?: Nullable<number>;
    hide?: Nullable<boolean>;
    products?: Nullable<Nullable<Product>[]>;
    Complex?: Nullable<Complex>;
}

export class Complex {
    id?: Nullable<number>;
    complexModels?: Nullable<Nullable<ComplexModel>[]>;
    dateOfCreation?: Nullable<string>;
}

export class ComplexCallback {
    isCurrentWeek: boolean;
    isEditable: boolean;
    complex: Complex;
}

export class Role {
    id: number;
    role: string;
    users?: Nullable<Nullable<User>[]>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract me(): User | Promise<User>;

    abstract classes(): Class[] | Promise<Class[]>;

    abstract class(id: number): Nullable<Class> | Promise<Nullable<Class>>;

    abstract myClass(): Class | Promise<Class>;

    abstract validUser(): boolean | Promise<boolean>;

    abstract getComplexesByUserId(): Complex[] | Promise<Complex[]>;

    abstract role(id: number): Role | Promise<Role>;

    abstract complexesList(): string | Promise<string>;

    abstract canEditComplex(): boolean | Promise<boolean>;

    abstract getBackComplex(i: number): Complex | Promise<Complex>;

    abstract getBalanceById(id?: Nullable<number>): number | Promise<number>;

    abstract getMyBalance(): number | Promise<number>;

    abstract getActualComplex(): string | Promise<string>;

    abstract categoryes(): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;

    abstract category(id: number): Nullable<Category> | Promise<Nullable<Category>>;

    abstract product(id: number): Nullable<Product> | Promise<Nullable<Product>>;

    abstract products(): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;

    abstract complexModel(id: number): Nullable<ComplexModel> | Promise<Nullable<ComplexModel>>;

    abstract complexModels(): Nullable<Nullable<ComplexModel>[]> | Promise<Nullable<Nullable<ComplexModel>[]>>;

    abstract complex(id: number): Nullable<Complex> | Promise<Nullable<Complex>>;

    abstract complexs(): Nullable<Nullable<Complex>[]> | Promise<Nullable<Nullable<Complex>[]>>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract createClass(input?: Nullable<NewClass>): Class | Promise<Class>;

    abstract registerUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract loginUser(input?: Nullable<LoginUser>): Token | Promise<Token>;

    abstract createComplex(input?: Nullable<NewComplex>, date?: Nullable<string>): Complex | Promise<Complex>;

    abstract createRole(input?: Nullable<NewRole>): Role | Promise<Role>;

    abstract changePassword(lastPass?: Nullable<string>, newPass?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;

    abstract changeComplex(input?: Nullable<NewComplex>): ComplexCallback | Promise<ComplexCallback>;

    abstract setBalance(id?: Nullable<number>, newBalance?: Nullable<number>): number | Promise<number>;

    abstract changePasswordAdmin(lastPass?: Nullable<string>, newPass?: Nullable<string>, userId?: Nullable<number>): Nullable<string> | Promise<Nullable<string>>;

    abstract createCategory(input?: Nullable<NewCategory>): Category | Promise<Category>;

    abstract createProduct(input?: Nullable<NewProduct>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract createComplexModel(input?: Nullable<NewComplexModel>): Nullable<ComplexModel> | Promise<Nullable<ComplexModel>>;
}

type Nullable<T> = T | null;

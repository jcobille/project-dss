import { Entity } from '@loopback/repository';
import { Review } from './review.model';
import { UserCredentials } from './user-credentials.model';
export declare class User extends Entity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    isRoot?: boolean;
    isActive?: boolean;
    reviews: Review[];
    userCredentials: UserCredentials;
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;

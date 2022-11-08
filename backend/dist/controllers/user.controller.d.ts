import { TokenService } from '@loopback/authentication';
import { Credentials, MyUserService, UserRepository } from '@loopback/authentication-jwt';
import { SchemaObject } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { User } from '../models';
import { ReviewRepository } from '../repositories';
import { CustomResponse } from '../services/types';
export declare class CreateUser extends User {
    password: string;
}
export declare const RequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare class UserController {
    jwtService: TokenService;
    userService: MyUserService;
    user: UserProfile;
    protected userRepository: UserRepository;
    protected reviewRepository: ReviewRepository;
    constructor(jwtService: TokenService, userService: MyUserService, user: UserProfile, userRepository: UserRepository, reviewRepository: ReviewRepository);
    signUp(newUserRequest: User): Promise<CustomResponse>;
    signIn(credentials: Credentials): Promise<CustomResponse>;
    whoAmI(loggedInUserProfile: UserProfile): Promise<CustomResponse>;
    findUsers(): Promise<CustomResponse>;
    updateById(id: string, user: User): Promise<CustomResponse>;
    deleteById(id: string): Promise<CustomResponse>;
}

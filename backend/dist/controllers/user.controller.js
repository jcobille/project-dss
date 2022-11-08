"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.RequestBody = exports.CreateUser = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const bcryptjs_1 = require("bcryptjs");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CreateUser = class CreateUser extends models_1.User {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "password", void 0);
CreateUser = tslib_1.__decorate([
    (0, repository_1.model)()
], CreateUser);
exports.CreateUser = CreateUser;
const UserSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 6,
        },
    },
};
exports.RequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: UserSchema },
    },
};
let UserController = class UserController {
    constructor(jwtService, userService, user, userRepository, reviewRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.user = user;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }
    // creates a user credentials
    async signUp(newUserRequest) {
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        try {
            if (!newUserRequest.firstName)
                throw new Error('First name is required');
            if (!newUserRequest.lastName)
                throw new Error('Last name is required');
            if (!newUserRequest.password)
                throw new Error('Password is required');
            if (!newUserRequest.email)
                throw new Error('Email is required');
            if (!emailPattern.test(newUserRequest.email))
                throw new Error('Email is invalid');
            if (!newUserRequest.password)
                throw new Error('Password is empty');
            const userCount = await this.userRepository.find();
            if (userCount.length === 0) {
                newUserRequest.role = 'Admin';
                newUserRequest.isActive = true;
            }
            else {
                if (!newUserRequest.role)
                    newUserRequest.role = 'User';
                newUserRequest.isActive = false;
            }
            const findUser = await this.userRepository.find({
                where: { email: newUserRequest.email },
            });
            if (findUser.length > 0)
                throw new Error('Email is already registered');
            const password = await (0, bcryptjs_1.hash)(newUserRequest.password, await (0, bcryptjs_1.genSalt)());
            const savedUser = await this.userRepository.create(lodash_1.default.omit(newUserRequest, 'password'));
            await this.userRepository
                .userCredentials(savedUser.id)
                .create({ password });
            return { data: newUserRequest, status: true, message: '' };
        }
        catch (err) {
            return { data: [], status: false, message: err.message };
        }
    }
    // returns a token of user when the credential is valid
    async signIn(credentials) {
        try {
            const foundUser = (await this.userRepository.findOne({
                where: { and: [{ email: credentials.email }] },
            }));
            if (!foundUser)
                throw new Error('Invalid user credentials');
            if (!foundUser.isActive)
                throw new Error('User is not active yet');
            const user = await this.userService.verifyCredentials(credentials);
            const userProfile = this.userService.convertToUserProfile(user);
            const token = await this.jwtService.generateToken(userProfile);
            if (!user)
                throw new Error('Invalid user credentials');
            return {
                data: { token: token },
                status: true,
                message: 'User credential is valid',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err.message };
        }
    }
    // returns the current user details
    async whoAmI(loggedInUserProfile) {
        let userId = loggedInUserProfile[security_1.securityId];
        const user = await this.userRepository.findById(userId);
        return { data: user, status: true, message: 'User found' };
    }
    // Returns all users
    async findUsers() {
        try {
            const user = await this.userRepository.find();
            if (user.length === 0)
                throw new Error('No user found');
            return {
                data: user,
                status: true,
                message: 'All user has been fetched',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err.message };
        }
    }
    // Patch the user details based on specified id
    async updateById(id, user) {
        try {
            await this.userRepository.updateById(id, user);
            return {
                data: [],
                status: true,
                message: 'User has been updated',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
    // delete user based on specified id
    async deleteById(id) {
        try {
            await this.userRepository.deleteById(id);
            return {
                data: [],
                status: true,
                message: 'User has been deleted',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/signup', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, {
                    title: 'NewUser',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, rest_1.post)('/signin', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)(exports.RequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/whoami', {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "whoAmI", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/users/list', {
        responses: {
            '200': {
                description: 'Return all users',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findUsers", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/user/{id}'),
    (0, rest_1.response)(204, {
        description: 'User PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/user/{id}'),
    (0, rest_1.response)(204, {
        description: 'User DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(1, (0, core_1.inject)(authentication_jwt_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(2, (0, core_1.inject)(security_1.SecurityBindings.USER, { optional: true })),
    tslib_1.__param(3, (0, repository_1.repository)(authentication_jwt_1.UserRepository)),
    tslib_1.__param(4, (0, repository_1.repository)(repositories_1.ReviewRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, authentication_jwt_1.MyUserService, Object, authentication_jwt_1.UserRepository,
        repositories_1.ReviewRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const review_model_1 = require("./review.model");
const user_credentials_model_1 = require("./user-credentials.model");
let User = class User extends repository_1.Entity {
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        format: 'email',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isRoot", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: false,
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => review_model_1.Review),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "reviews", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => user_credentials_model_1.UserCredentials, { keyTo: 'userId' }),
    tslib_1.__metadata("design:type", user_credentials_model_1.UserCredentials)
], User.prototype, "userCredentials", void 0);
User = tslib_1.__decorate([
    (0, repository_1.model)()
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map
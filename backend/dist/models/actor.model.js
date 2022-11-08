"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const movie_actor_model_1 = require("./movie-actor.model");
const movie_model_1 = require("./movie.model");
let Actor = class Actor extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Actor.prototype, "age", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "image", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => movie_model_1.Movie, { through: { model: () => movie_actor_model_1.MovieActor } }),
    tslib_1.__metadata("design:type", Array)
], Actor.prototype, "movies", void 0);
Actor = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Actor);
exports.Actor = Actor;
//# sourceMappingURL=actor.model.js.map
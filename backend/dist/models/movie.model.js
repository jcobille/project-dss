"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const actor_model_1 = require("./actor.model");
const movie_actor_model_1 = require("./movie-actor.model");
const review_model_1 = require("./review.model");
let Movie = class Movie extends repository_1.Entity {
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
], Movie.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "cost", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "releasedDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Movie.prototype, "duration", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "image", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => review_model_1.Review),
    tslib_1.__metadata("design:type", Array)
], Movie.prototype, "reviews", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => actor_model_1.Actor, { through: { model: () => movie_actor_model_1.MovieActor } }),
    tslib_1.__metadata("design:type", Array)
], Movie.prototype, "actors", void 0);
Movie = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=movie.model.js.map
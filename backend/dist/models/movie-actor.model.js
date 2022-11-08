"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieActor = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let MovieActor = class MovieActor extends repository_1.Entity {
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
], MovieActor.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], MovieActor.prototype, "movieId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], MovieActor.prototype, "actorId", void 0);
MovieActor = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], MovieActor);
exports.MovieActor = MovieActor;
//# sourceMappingURL=movie-actor.model.js.map
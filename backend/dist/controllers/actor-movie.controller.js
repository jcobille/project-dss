"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorMovieController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ActorMovieController = class ActorMovieController {
    constructor(actorRepository) {
        this.actorRepository = actorRepository;
    }
    /* Returns all the movies of the actor */
    async find(id, filter) {
        try {
            const movies = await this.actorRepository.movies(id).find();
            return {
                data: movies,
                status: true,
                message: 'Actor movies has been fetched',
            };
        }
        catch (err) {
            return {
                data: [],
                status: false,
                message: 'No movies for this actor found',
            };
        }
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/actors/{id}/movies', {
        responses: {
            '200': {
                description: 'Array of Actor has many Movie through MovieActor',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Movie) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActorMovieController.prototype, "find", null);
ActorMovieController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ActorRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ActorRepository])
], ActorMovieController);
exports.ActorMovieController = ActorMovieController;
//# sourceMappingURL=actor-movie.controller.js.map
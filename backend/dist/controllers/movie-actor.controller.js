"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieActorController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let MovieActorController = class MovieActorController {
    constructor(movieRepository, movieActorRepository) {
        this.movieRepository = movieRepository;
        this.movieActorRepository = movieActorRepository;
    }
    // Returns all the actors from the movie
    async find(id, filter) {
        return this.movieRepository.actors(id).find(filter);
    }
    // inserts all the actors based on the movie id
    async linkActors(id, actors) {
        try {
            let movieActorsList = await this.movieRepository.actors(id).find();
            movieActorsList.forEach(async (actor) => {
                // remove all the actors on the collection
                await this.movieRepository.actors(id).unlink(actor.id);
            });
            // adds a new list of actors to collection
            actors.forEach(actor => this.movieRepository.actors(id).link(actor.id));
            return {
                data: [],
                status: true,
                message: 'Movie has been updated',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/movies/{id}/actors', {
        responses: {
            '200': {
                description: 'Array of Movie has many Actor through MovieActor',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Actor) },
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
], MovieActorController.prototype, "find", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/movie/{id}/actors', {
        responses: {
            '200': {
                description: 'create an Actor model instance',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Actor),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Actor, {
                        title: 'NewActor',
                    }),
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], MovieActorController.prototype, "linkActors", null);
MovieActorController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.MovieRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.MovieActorRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MovieRepository,
        repositories_1.MovieActorRepository])
], MovieActorController);
exports.MovieActorController = MovieActorController;
//# sourceMappingURL=movie-actor.controller.js.map
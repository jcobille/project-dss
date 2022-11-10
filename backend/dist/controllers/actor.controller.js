"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ActorController = class ActorController {
    constructor(movieRepository, actorRepository) {
        this.movieRepository = movieRepository;
        this.actorRepository = actorRepository;
    }
    // This is for creating new actor
    async create(actor) {
        try {
            if (!actor.firstName)
                throw new Error('First name is required');
            if (!actor.lastName)
                throw new Error('Last name is required');
            if (!actor.gender)
                throw new Error('Gender is required');
            if (actor.age === 0)
                throw new Error('Age is required');
            if (!actor.image)
                throw new Error('Actor image is required');
            const newActor = await this.actorRepository.create(actor);
            if (!newActor)
                throw new Error("There's an error while creating a new actor");
            return {
                data: newActor,
                status: true,
                message: 'New actor has been created',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err.message };
        }
    }
    // This will return all the actors
    async findAll(filter) {
        try {
            const actors = await this.actorRepository.find({
                include: ['movies'],
            });
            return { data: actors, status: true, message: 'Actors has been fetched' };
        }
        catch (err) {
            return { data: [], status: false, message: 'No actors found' };
        }
    }
    // It is used to search for the actors based on the parameter given
    async find(name, filter) {
        const pattern = new RegExp('^' + name + '.*', 'i');
        const actors = await this.actorRepository.find({
            where: { firstName: { regexp: pattern } }, // search an actor by its firstName
        });
        return { data: actors, status: true, message: '' };
    }
    // it will return all the details of the actor based on its id
    async findById(id, filter) {
        try {
            const actor = await this.actorRepository.findById(id, filter);
            return {
                data: actor,
                status: true,
                message: 'Actor details has been fetched',
            };
        }
        catch (err) {
            return {
                data: [],
                status: false,
                message: "Can't find the actor's details",
            };
        }
    }
    // it will update the actor's details
    async updateById(id, actor) {
        try {
            await this.actorRepository.updateById(id, actor);
            return {
                data: [],
                status: true,
                message: 'Actor details has been edited',
            };
        }
        catch (err) {
            return { data: [], status: false, message: "Can't update actor details" };
        }
    }
    // Deletes the actor details but checks if the actor still have movies
    async deleteById(id) {
        try {
            const actorMovies = await this.actorRepository.movies(id).find();
            if (actorMovies.length > 0)
                throw new Error('Actor still have movies associated');
            await this.actorRepository.deleteById(id);
            return {
                data: [],
                status: true,
                message: 'Actor has been deleted',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err.message };
        }
    }
};
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/actor'),
    (0, rest_1.response)(200, {
        description: 'Actor model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Actor) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Actor, {
                    title: 'NewActor',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActorController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/actor'),
    (0, rest_1.response)(200, {
        description: 'Array of Actor model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Actor, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Actor)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActorController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/actor/{name}'),
    (0, rest_1.response)(200, {
        description: 'Array of Searched Actor model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Actor, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('name')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Actor)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActorController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.get)('/actor/details/{id}'),
    (0, rest_1.response)(200, {
        description: 'Actor model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Actor, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Actor, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActorController.prototype, "findById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/actor/{id}'),
    (0, rest_1.response)(204, {
        description: 'Actor PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Actor, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Actor]),
    tslib_1.__metadata("design:returntype", Promise)
], ActorController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/actor/{id}'),
    (0, rest_1.response)(204, {
        description: 'Actor DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ActorController.prototype, "deleteById", null);
ActorController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.MovieRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ActorRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MovieRepository,
        repositories_1.ActorRepository])
], ActorController);
exports.ActorController = ActorController;
//# sourceMappingURL=actor.controller.js.map
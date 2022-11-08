"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let MovieController = class MovieController {
    constructor(movieRepository) {
        this.movieRepository = movieRepository;
    }
    // creates new movie details
    async create(movie) {
        try {
            if (!movie.title)
                throw 'Title is required';
            if (!movie.description)
                throw 'Description is required';
            if (!movie.cost)
                throw 'Budget cost is required';
            if (!movie.released_date)
                throw 'Released date is required';
            if (movie.duration === 0)
                throw 'Duration is required';
            if (!movie.image)
                throw 'Movie image is required';
            let newMovie = await this.movieRepository.create(movie);
            if (!newMovie)
                throw 'Cannot create new movie';
            return {
                data: newMovie,
                status: true,
                message: 'Movie has been created.',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
    async find() {
        try {
            const movieList = await this.movieRepository.find({
                include: ['reviews', 'actors'],
            });
            if (!movieList)
                throw 'No movies found';
            return {
                data: movieList,
                status: true,
                message: 'Movie list has been fetched.',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
    // Search all the movies that is equal to parameter
    async findMovies(name) {
        const pattern = new RegExp('^' + name + '.*', 'i');
        const foundMovies = await this.movieRepository.find({
            where: { title: { regexp: pattern } },
        });
        return { data: foundMovies, status: true, message: '' };
    }
    // Returns the details, reviews and actors of the movie
    async findById(id, filter) {
        try {
            const movieDetails = await this.movieRepository.findById(id, {
                include: ['reviews', 'actors'],
            });
            return {
                data: movieDetails,
                status: true,
                message: 'Movie details found.',
            };
        }
        catch (err) {
            return {
                data: [],
                status: false,
                message: "Can't find specific movie details",
            };
        }
    }
    async updateById(id, movie) {
        try {
            if (!movie.description)
                throw 'Description is required';
            await this.movieRepository.updateById(id, movie);
            return {
                data: movie,
                status: true,
                message: 'Movie has been updated',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
    async deleteById(id) {
        try {
            await this.movieRepository.deleteById(id);
            return {
                data: [],
                status: true,
                message: 'Movie has been deleted',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
    // Returns all the movie reviews based on movie id
    async findReviews(id, filter) {
        try {
            let reviews = await this.movieRepository.reviews(id).find(filter);
            if (reviews.length === 0)
                throw 'No reviews found';
            return {
                data: [],
                status: true,
                message: 'Movie reviews has been fetched',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
};
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/movie'),
    (0, rest_1.response)(200, {
        description: 'Movie model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Movie) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Movie, {
                    title: 'NewMovie',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MovieController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/movies'),
    (0, rest_1.response)(200, {
        description: 'Array of Movie model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Movie, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MovieController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.get)('/movies/{name}'),
    (0, rest_1.response)(200, {
        description: 'Array of Searched Actor model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Movie, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MovieController.prototype, "findMovies", null);
tslib_1.__decorate([
    (0, rest_1.get)('/movie/{id}'),
    (0, rest_1.response)(200, {
        description: 'Movie model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Movie, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Movie, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MovieController.prototype, "findById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/movie/{id}'),
    (0, rest_1.response)(204, {
        description: 'Movie PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Movie, { partial: true }),
                exclude: ['title', 'cost', 'released_date', 'duration', 'image'],
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Movie]),
    tslib_1.__metadata("design:returntype", Promise)
], MovieController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/movie/{id}'),
    (0, rest_1.response)(204, {
        description: 'Movie DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MovieController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/movie/{id}/reviews', {
        responses: {
            '200': {
                description: 'Array of Movie has many Review',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Review) },
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
], MovieController.prototype, "findReviews", null);
MovieController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.MovieRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MovieRepository])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map
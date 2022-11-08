"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let MovieRepository = class MovieRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, reviewRepositoryGetter, movieActorRepositoryGetter, actorRepositoryGetter) {
        super(models_1.Movie, dataSource);
        this.reviewRepositoryGetter = reviewRepositoryGetter;
        this.movieActorRepositoryGetter = movieActorRepositoryGetter;
        this.actorRepositoryGetter = actorRepositoryGetter;
        this.actors = this.createHasManyThroughRepositoryFactoryFor('actors', actorRepositoryGetter, movieActorRepositoryGetter);
        this.registerInclusionResolver('actors', this.actors.inclusionResolver);
        this.reviews = this.createHasManyRepositoryFactoryFor('reviews', reviewRepositoryGetter);
        this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
    }
};
MovieRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.db')),
    tslib_1.__param(1, repository_1.repository.getter('ReviewRepository')),
    tslib_1.__param(2, repository_1.repository.getter('MovieActorRepository')),
    tslib_1.__param(3, repository_1.repository.getter('ActorRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource, Function, Function, Function])
], MovieRepository);
exports.MovieRepository = MovieRepository;
//# sourceMappingURL=movie.repository.js.map
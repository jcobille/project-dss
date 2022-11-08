"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ActorRepository = class ActorRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, movieActorRepositoryGetter, movieRepositoryGetter) {
        super(models_1.Actor, dataSource);
        this.movieActorRepositoryGetter = movieActorRepositoryGetter;
        this.movieRepositoryGetter = movieRepositoryGetter;
        this.movies = this.createHasManyThroughRepositoryFactoryFor('movies', movieRepositoryGetter, movieActorRepositoryGetter);
        this.registerInclusionResolver('movies', this.movies.inclusionResolver);
    }
};
ActorRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.db')),
    tslib_1.__param(1, repository_1.repository.getter('MovieActorRepository')),
    tslib_1.__param(2, repository_1.repository.getter('MovieRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource, Function, Function])
], ActorRepository);
exports.ActorRepository = ActorRepository;
//# sourceMappingURL=actor.repository.js.map
import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Actor, Movie, MovieActor, MovieRelations, Review } from '../models';
import { ActorRepository } from './actor.repository';
import { MovieActorRepository } from './movie-actor.repository';
import { ReviewRepository } from './review.repository';
export declare class MovieRepository extends DefaultCrudRepository<Movie, typeof Movie.prototype.id, MovieRelations> {
    protected reviewRepositoryGetter: Getter<ReviewRepository>;
    protected movieActorRepositoryGetter: Getter<MovieActorRepository>;
    protected actorRepositoryGetter: Getter<ActorRepository>;
    readonly reviews: HasManyRepositoryFactory<Review, typeof Movie.prototype.id>;
    readonly actors: HasManyThroughRepositoryFactory<Actor, typeof Actor.prototype.id, MovieActor, typeof Movie.prototype.id>;
    constructor(dataSource: DbDataSource, reviewRepositoryGetter: Getter<ReviewRepository>, movieActorRepositoryGetter: Getter<MovieActorRepository>, actorRepositoryGetter: Getter<ActorRepository>);
}

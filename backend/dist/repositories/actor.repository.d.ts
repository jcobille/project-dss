import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Actor, ActorRelations, Movie, MovieActor } from '../models';
import { MovieActorRepository } from './movie-actor.repository';
import { MovieRepository } from './movie.repository';
export declare class ActorRepository extends DefaultCrudRepository<Actor, typeof Actor.prototype.id, ActorRelations> {
    protected movieActorRepositoryGetter: Getter<MovieActorRepository>;
    protected movieRepositoryGetter: Getter<MovieRepository>;
    readonly movies: HasManyThroughRepositoryFactory<Movie, typeof Movie.prototype.id, MovieActor, typeof Actor.prototype.id>;
    constructor(dataSource: DbDataSource, movieActorRepositoryGetter: Getter<MovieActorRepository>, movieRepositoryGetter: Getter<MovieRepository>);
}

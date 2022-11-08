import { Filter } from '@loopback/repository';
import { Actor, Movie } from '../models';
import { MovieActorRepository, MovieRepository } from '../repositories';
import { CustomResponse } from '../services/types';
export declare class MovieActorController {
    protected movieRepository: MovieRepository;
    protected movieActorRepository: MovieActorRepository;
    constructor(movieRepository: MovieRepository, movieActorRepository: MovieActorRepository);
    find(id: string, filter?: Filter<Actor>): Promise<Actor[]>;
    linkActors(id: typeof Movie.prototype.id, actors: Actor[]): Promise<CustomResponse>;
}

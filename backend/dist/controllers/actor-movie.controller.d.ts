import { Filter } from '@loopback/repository';
import { Movie } from '../models';
import { ActorRepository } from '../repositories';
import { CustomResponse } from '../services/types';
export declare class ActorMovieController {
    protected actorRepository: ActorRepository;
    constructor(actorRepository: ActorRepository);
    find(id: string, filter?: Filter<Movie>): Promise<CustomResponse>;
}

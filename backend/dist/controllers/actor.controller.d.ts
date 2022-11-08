import { Filter, FilterExcludingWhere } from '@loopback/repository';
import { Actor } from '../models';
import { ActorRepository, MovieRepository } from '../repositories';
import { CustomResponse } from '../services/types';
export declare class ActorController {
    protected movieRepository: MovieRepository;
    actorRepository: ActorRepository;
    constructor(movieRepository: MovieRepository, actorRepository: ActorRepository);
    create(actor: Omit<Actor, 'id'>): Promise<CustomResponse>;
    findAll(filter?: Filter<Actor>): Promise<CustomResponse>;
    find(name: string, filter?: Filter<Actor>): Promise<CustomResponse>;
    findById(id: string, filter?: FilterExcludingWhere<Actor>): Promise<CustomResponse>;
    updateById(id: string, actor: Actor): Promise<CustomResponse>;
    deleteById(id: string): Promise<CustomResponse>;
}

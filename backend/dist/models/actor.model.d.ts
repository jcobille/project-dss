import { Entity } from '@loopback/repository';
import { Movie } from './movie.model';
export declare class Actor extends Entity {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    image?: string;
    movies: Movie[];
    constructor(data?: Partial<Actor>);
}
export interface ActorRelations {
}
export declare type ActorWithRelations = Actor & ActorRelations;

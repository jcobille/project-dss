import { Entity } from '@loopback/repository';
export declare class MovieActor extends Entity {
    id?: string;
    movieId: string;
    actorId: string;
    constructor(data?: Partial<MovieActor>);
}
export interface MovieActorRelations {
}
export declare type MovieActorWithRelations = MovieActor & MovieActorRelations;

import { Entity } from '@loopback/repository';
import { Actor } from './actor.model';
import { Review } from './review.model';
export declare class Movie extends Entity {
    id?: string;
    title: string;
    description: string;
    cost: string;
    releasedDate: string;
    duration: number;
    image: string;
    reviews: Review[];
    actors: Actor[];
    constructor(data?: Partial<Movie>);
}
export interface MovieRelations {
}
export declare type MovieWithRelations = Movie & MovieRelations;

import { Entity } from '@loopback/repository';
export declare class Review extends Entity {
    id?: string;
    reviewScore: number;
    description: string;
    posted_date?: string;
    status: string;
    movieId?: string;
    userId: string;
    constructor(data?: Partial<Review>);
}
export interface ReviewRelations {
}
export declare type ReviewWithRelations = Review & ReviewRelations;

import { Filter, FilterExcludingWhere } from '@loopback/repository';
import { Movie, Review } from '../models';
import { MovieRepository } from '../repositories';
import { CustomResponse } from '../services/types';
export declare class MovieController {
    movieRepository: MovieRepository;
    constructor(movieRepository: MovieRepository);
    create(movie: Omit<Movie, 'id'>): Promise<CustomResponse>;
    find(): Promise<CustomResponse>;
    findMovies(name: string): Promise<CustomResponse>;
    findById(id: string, filter?: FilterExcludingWhere<Movie>): Promise<CustomResponse>;
    updateById(id: string, movie: Movie): Promise<CustomResponse>;
    deleteById(id: string): Promise<CustomResponse>;
    findReviews(id: string, filter?: Filter<Review>): Promise<CustomResponse>;
}

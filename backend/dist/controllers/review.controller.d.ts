import { Review } from '../models';
import { ReviewRepository } from '../repositories';
import { CustomResponse } from '../services/types';
export declare class ReviewController {
    reviewRepository: ReviewRepository;
    constructor(reviewRepository: ReviewRepository);
    create(review: Omit<Review, 'id'>): Promise<CustomResponse>;
    updateById(id: string, review: Review): Promise<CustomResponse>;
}

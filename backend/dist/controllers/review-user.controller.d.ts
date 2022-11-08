import { Review } from '../models';
import { ReviewRepository } from '../repositories';
import { CustomResponse } from '../services/types';
export declare class ReviewUserController {
    reviewRepository: ReviewRepository;
    constructor(reviewRepository: ReviewRepository);
    getUser(id: typeof Review.prototype.id): Promise<CustomResponse>;
}

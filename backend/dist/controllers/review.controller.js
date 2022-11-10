"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ReviewController = class ReviewController {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    // creates a new review from a user
    async create(review) {
        review = { ...review, status: 'checking' };
        try {
            const newReview = await this.reviewRepository.create(review);
            if (!newReview)
                throw new Error('Cannot create new review');
            return {
                data: newReview,
                status: true,
                message: 'Movie has been created.',
            };
        }
        catch (err) {
            return { data: [], status: false, message: err.message };
        }
    }
    // Approves or decline a review
    async updateById(id, review) {
        try {
            await this.reviewRepository.updateById(id, review);
            return {
                data: [],
                status: true,
                message: `Review has been ${review.status}`,
            };
        }
        catch (err) {
            return { data: [], status: false, message: err };
        }
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/review'),
    (0, rest_1.response)(200, {
        description: 'Review model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Review) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Review, {
                    title: 'NewReview',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/review/{id}'),
    (0, rest_1.response)(204, {
        description: 'Review PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Review, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Review]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "updateById", null);
ReviewController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ReviewRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ReviewRepository])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map
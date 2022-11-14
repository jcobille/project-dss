import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ReviewController} from '../../controllers';
import {Review} from '../../models';
import {ReviewRepository} from '../../repositories';
import {givenReview} from '../helpers';

let controller: ReviewController;
let aReview: Review;
let aReviewWithId: Review;
let aChangedReview: Review;

describe('ReviewController', () => {
  let reviewRepo: StubbedInstanceWithSinonAccessor<ReviewRepository>;
  beforeEach(givenStubbedRepository);

  describe('Review', () => {
    it('creates a Review', async () => {
      const create = reviewRepo.stubs.create;
      create.resolves(aReviewWithId);
      const response = await controller.create(aReview);
      expect(response.data).to.eql(aReviewWithId);
      sinon.assert.calledWith(create, aReview);
    });

    it('successfully updates existing review', async () => {
      const updateById = reviewRepo.stubs.updateById;
      updateById.resolves();
      await controller.updateById(aReviewWithId.id as string, aChangedReview);
      sinon.assert.calledWith(updateById, aReviewWithId.id, aChangedReview);
    });
  });

  function givenStubbedRepository() {
    reviewRepo = createStubInstance(ReviewRepository);
    aReview = givenReview();
    aReviewWithId = givenReview({
      id: '635e2a561fd72a3b343f1576',
    });

    aChangedReview = givenReview({
      id: aReviewWithId.id,
      status: 'approved',
    });

    controller = new ReviewController(reviewRepo);
  }
});

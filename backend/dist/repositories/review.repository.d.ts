import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Review, ReviewRelations, User } from '../models';
import { UserRepository } from './user.repository';
export declare class ReviewRepository extends DefaultCrudRepository<Review, typeof Review.prototype.id, ReviewRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly user: BelongsToAccessor<User, typeof Review.prototype.id>;
    constructor(dataSource: DbDataSource, userRepositoryGetter: Getter<UserRepository>);
}

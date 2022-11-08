import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { MovieActor, MovieActorRelations } from '../models';
export declare class MovieActorRepository extends DefaultCrudRepository<MovieActor, typeof MovieActor.prototype.id, MovieActorRelations> {
    constructor(dataSource: DbDataSource);
}

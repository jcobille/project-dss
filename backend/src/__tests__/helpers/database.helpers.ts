import {Actor, Movie} from '../../models';
import {
  ActorRepository,
  MovieActorRepository,
  MovieRepository,
  ReviewRepository,
  UserCredentialsRepository,
  UserRepository,
} from '../../repositories';
import {testdb} from '../datasources/testdb.datasource';

let actorRepo: ActorRepository;
let userRepo: UserRepository;
let userCredentialsRepo: UserCredentialsRepository;
let movieActorRepo: MovieActorRepository;
let movieRepo: MovieRepository;
let reviewRepo: ReviewRepository;

export async function givenEmptyDatabase() {
  actorRepo = new ActorRepository(
    testdb,
    async () => movieActorRepo,
    async () => movieRepo,
  );

  userRepo = new UserRepository(testdb, async () => userCredentialsRepo);

  movieRepo = new MovieRepository(
    testdb,
    async () => reviewRepo,
    async () => movieActorRepo,
    async () => actorRepo,
  );

  reviewRepo = new ReviewRepository(testdb, async () => userRepo);

  await actorRepo.deleteAll();
  await userRepo.deleteAll();
  await movieRepo.deleteAll();
  await reviewRepo.deleteAll();
}

export function givenActorData(data?: Partial<Actor>) {
  return Object.assign({
    firstName: 'firstname',
    lastName: 'lastname',
    gender: 'male',
    age: 28,
    image: 'https://cdn-icons-png.flaticon.com/512/168/168882.png',
  });
}

export async function givenActor(data?: Partial<Actor>) {
  return new ActorRepository(
    testdb,
    async () => movieActorRepo,
    async () => movieRepo,
  ).create(givenActorData(data));
}

export function givenMovieData(data?: Partial<Movie>) {
  return Object.assign({
    title: 'Black Maria',
    description: 'description',
    releasedDate: '2022-05-22',
    duration: 106,
    image:
      'https://img.xmovies8.fun/xxrz/250x400/100/15/1b/151b961f5343bebb7f434f3060079d97/151b961f5343bebb7f434f3060079d97.jpg',
    cost: '$10 million',
  });
}

export async function givenMovie(data?: Partial<Movie>) {
  return new MovieRepository(
    testdb,
    async () => reviewRepo,
    async () => movieActorRepo,
    async () => actorRepo,
  ).create(givenMovieData(data));
}

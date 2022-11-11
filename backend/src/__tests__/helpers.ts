import {givenHttpServerConfig} from '@loopback/testlab';
import {BackendApplication} from '../application';
import {Actor, Movie, Review, User} from '../models';
import {MovieRepository, UserRepository} from '../repositories';

export function givenAdmin(user?: Partial<User>) {
  const data = Object.assign(
    {
      firstName: 'root',
      lastName: 'admin',
      email: 'root@admin.com',
      role: 'Admin',
      password: 'test123',
      isActive: true,
    },
    user,
  );
  return new User(data);
}

export function givenMovie(movie?: Partial<Movie>) {
  const data = Object.assign(
    {
      title: 'Barbarian',
      description:
        'In town for a job interview, a young woman arrives at her Airbnb late at night only to find that it has been mistakenly double-booked and a strange man is already staying there. Against her better judgement, she decides to stay the night anyway, but soon discovers that there is much more to be afraid of in the house than the other house guest.',
      cost: '$100 Million',
      releasedDate: '2022-09-08',
      duration: 102,
      image:
        'https://img.xmovies8.fun/xxrz/250x400/100/0a/b0/0ab08224c226dd6b284144f1b91dac79/0ab08224c226dd6b284144f1b91dac79.jpg',
    },
    movie,
  );
  return new Movie(data);
}

export function givenUser(user?: Partial<User>) {
  const data = Object.assign(
    {
      firstName: 'user',
      lastName: 'name',
      email: 'user@email.com',
      role: 'user',
      password: 'test123',
      isActive: false,
    },
    user,
  );
  return new User(data);
}

export function givenActor(actor?: Partial<Actor>) {
  const data = Object.assign(
    {
      firstName: 'Sarah',
      lastName: 'Shahi',
      gender: 'Female',
      age: 42,
      image:
        'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR6bMpT-g99Sl1A9UtU6L5X4VcN_ADVkV2pKsFD2TTW2jDDRN1asWn7ZbyrjZ8nan3tZn38A9dnHmpRhZg',
    },
    actor,
  );
  return new Actor(data);
}

export function givenReview(review?: Partial<Review>) {
  const data = Object.assign(
    {
      reviewScore: 5,
      description: 'This is an honest review',
      postedDate: '2022-11-11',
      status: 'checking',
      movieId: '635e2a561fd72a3b343f1576',
      userId: '636c6b5a6861ba21acb89047',
    },
    review,
  );
  return new Review(data);
}

export function givenAdminCredentials(user?: Partial<User>) {
  const data = Object.assign(
    {
      email: 'root@admin.com',
      password: 'test123',
    },
    user,
  );
  return new User(data);
}

export function givenUserCredentials(user?: Partial<User>) {
  const data = Object.assign(
    {
      email: 'user@email.com',
      password: 'test123',
    },
    user,
  );
  return new User(data);
}

export function givenAdminWithoutId(user?: Partial<User>): Omit<User, 'id'> {
  return givenAdmin(user);
}

export function givenUserWithoutId(user?: Partial<User>): Omit<User, 'id'> {
  return givenUser(user);
}

export function givenMovieWithoutId(movie?: Partial<Movie>): Omit<Movie, 'id'> {
  return givenMovie(movie);
}

export async function givenUserRepositories(app: BackendApplication) {
  const userRepo = await app.getRepository(UserRepository);
  return {userRepo};
}

export async function givenMovieRepositories(app: BackendApplication) {
  const movieRepo = await app.getRepository(MovieRepository);
  return {movieRepo};
}

export async function givenRunningApplicationWithCustomConfiguration() {
  const app = new BackendApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();

  app.bind('datasources.config.db').to({
    name: 'db',
    connector: 'memory',
  });

  await app.start();
  return app;
}

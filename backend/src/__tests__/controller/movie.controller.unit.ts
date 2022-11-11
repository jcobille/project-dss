import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {MovieController} from '../../controllers';
import {Movie} from '../../models';
import {MovieRepository} from '../../repositories';
import {givenMovie} from '../helpers';

let controller: MovieController;
let aMovie: Movie;
let aMovieWithId: Movie;
let aChangedMovie: Movie;
let aListOfMovies: Movie[];

describe('MovieController', () => {
  let movieRepo: StubbedInstanceWithSinonAccessor<MovieRepository>;
  beforeEach(givenStubbedRepository);

  describe('Movie', () => {
    it('creates a Movie', async () => {
      const create = movieRepo.stubs.create;
      create.resolves(aMovieWithId);
      const response = await controller.createMovie(aMovie);
      expect(response.data).to.eql(aMovieWithId);
      sinon.assert.calledWith(create, aMovie);
    });

    it('returns an error when title is empty', async () => {
      const create = movieRepo.stubs.create;
      aMovieWithId.title = '';
      create.resolves(aMovieWithId);
      const response = await controller.createMovie(aMovieWithId);
      expect(response.message).to.eql('Field title is required.');
    });

    it('returns a movie details', async () => {
      const findById = movieRepo.stubs.findById;
      findById.resolves(aMovieWithId);
      const response = await controller.findById(aMovieWithId.id as string);
      expect(response.data).to.eql(aMovieWithId);
      sinon.assert.calledWith(findById, aMovieWithId.id);
    });

    it('returns multiple movies if they exist', async () => {
      const find = movieRepo.stubs.find;
      find.resolves(aListOfMovies);
      const response = await controller.getMovies();
      expect(response.data).to.eql(aListOfMovies);
      sinon.assert.called(find);
    });

    it('successfully updates existing movie', async () => {
      const updateById = movieRepo.stubs.updateById;
      updateById.resolves();
      await controller.updateById(aMovieWithId.id as string, aChangedMovie);
      sinon.assert.calledWith(updateById, aMovieWithId.id, aChangedMovie);
    });

    it('successfully deletes existing movie', async () => {
      const deleteById = movieRepo.stubs.deleteById;
      deleteById.resolves();
      await controller.deleteById(aMovieWithId.id as string);
      sinon.assert.calledWith(deleteById, aMovieWithId.id);
    });
  });

  function givenStubbedRepository() {
    movieRepo = createStubInstance(MovieRepository);
    aMovie = givenMovie();
    aMovieWithId = givenMovie({
      id: '635e2a561fd72a3b343f1576',
    });
    aListOfMovies = [
      aMovieWithId,
      givenMovie({
        id: '635d3d39425fc647181495f2',
        title: 'Black Adam',
        description: 'description',
        releasedDate: '2022-05-22',
        duration: 106,
        image:
          'https://m.media-amazon.com/images/M/MV5BYzZkOGUwMzMtMTgyNS00YjFlLTg5NzYtZTE3Y2E5YTA5NWIyXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
        cost: '$195 million',
      }),
    ] as Movie[];
    aChangedMovie = givenMovie({
      id: aMovieWithId.id,
      title: 'Barbarian -edited',
    });

    controller = new MovieController(movieRepo);
  }
});

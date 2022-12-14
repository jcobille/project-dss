import {authenticate} from '@loopback/authentication';
import {Filter, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Movie, Review} from '../models';
import {MovieRepository} from '../repositories';
import {isEmpty} from '../services/helpers';
import {CustomResponse} from '../services/types';
export class MovieController {
  constructor(
    @repository(MovieRepository)
    public movieRepository: MovieRepository,
  ) {}

  // creates new movie details
  @authenticate('jwt')
  @post('/movie')
  @response(200, {
    description: 'Movie model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movie)}},
  })
  async createMovie(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {
            title: 'NewMovie',
            exclude: ['id'],
          }),
        },
      },
    })
    movie: Omit<Movie, 'id'>,
  ): Promise<CustomResponse> {
    try {
      isEmpty(movie.title, 'title');
      isEmpty(movie.description, 'description');

      const newMovie = await this.movieRepository.create(movie);
      if (!newMovie) throw new Error('Cannot create new movie');

      return {
        data: newMovie,
        status: true,
        message: 'Movie has been created',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  @get('/movies')
  @response(200, {
    description: 'Array of Movie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movie, {includeRelations: true}),
        },
      },
    },
  })
  async getMovies(): Promise<CustomResponse> {
    try {
      const movieList = await this.movieRepository.find({
        include: ['reviews', 'actors'],
      });

      if (!movieList) throw new Error('No movies found');

      return {
        data: movieList,
        status: true,
        message: 'Movie list has been fetched.',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  // Search all the movies that is equal to parameter
  @get('/movies/{name}')
  @response(200, {
    description: 'Array of Searched Actor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movie, {includeRelations: true}),
        },
      },
    },
  })
  async findMovies(
    @param.path.string('name') name: string,
  ): Promise<CustomResponse> {
    const pattern = new RegExp('^' + name + '.*', 'i');
    const foundMovies = await this.movieRepository.find({
      where: {title: {regexp: pattern}},
    });
    return {data: foundMovies, status: true, message: ''};
  }

  // Returns the details, reviews and actors of the movie
  @get('/movie/{id}')
  @response(200, {
    description: 'Movie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movie, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<CustomResponse> {
    try {
      const movieDetails = await this.movieRepository.findById(id, {
        include: [{relation: 'reviews', scope: {include: ['user']}}, 'actors'],
      });
      return {
        data: movieDetails,
        status: true,
        message: 'Movie details found.',
      };
    } catch (err) {
      return {
        data: [],
        status: false,
        message: "Can't find specific movie details",
      };
    }
  }

  @authenticate('jwt')
  @patch('/movie/{id}')
  @response(204, {
    description: 'Movie PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {partial: true}),
          exclude: ['title', 'cost', 'releasedDate', 'duration', 'image'],
        },
      },
    })
    movie: Movie,
  ): Promise<CustomResponse> {
    try {
      if (!movie.description) throw new Error('Description is required');

      await this.movieRepository.updateById(id, movie);

      return {
        data: movie,
        status: true,
        message: 'Movie has been updated',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  @authenticate('jwt')
  @del('/movie/{id}')
  @response(204, {
    description: 'Movie DELETE success',
  })
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse> {
    try {
      await this.movieRepository.deleteById(id);
      return {
        data: [],
        status: true,
        message: 'Movie has been deleted',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  // Returns all the movie reviews based on movie id
  @get('/movie/{id}/reviews', {
    responses: {
      '200': {
        description: 'Array of Movie has many Review',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Review)},
          },
        },
      },
    },
  })
  async findReviews(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Review>,
  ): Promise<CustomResponse> {
    try {
      const reviews = await this.movieRepository.reviews(id).find(filter);
      if (reviews.length === 0) throw new Error('No reviews found');

      return {
        data: reviews,
        status: true,
        message: 'Movie reviews has been fetched',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }
}

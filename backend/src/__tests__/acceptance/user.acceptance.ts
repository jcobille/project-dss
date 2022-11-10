import {
  Client,
  createRestAppClient,
  expect,
  supertest,
} from '@loopback/testlab';
import _ from 'lodash';
import {BackendApplication} from '../../application';
import {UserRepository} from '../../repositories';
import {
  givenAdminCredentials,
  givenAdminWithoutId,
  givenRunningApplicationWithCustomConfiguration,
  givenUser,
  givenUserCredentials,
  givenUserRepositories,
} from '../helpers';

describe('User and admin login scenario', () => {
  let app: BackendApplication;
  let client: Client;
  let userRepo: UserRepository;
  let token = '';
  let userId = '';

  before(async () => {
    app = await givenRunningApplicationWithCustomConfiguration();
  });

  before(async () => {
    ({userRepo} = await givenUserRepositories(app));
  });

  before(() => {
    client = createRestAppClient(app);
  });

  after(() => app.stop());

  context('Scenario 1: Signing up as admin', () => {
    it('signup admin account successfully', async () => {
      const admin = givenAdminWithoutId();
      const response: supertest.Response = await client
        .post(`/signup`)
        .send(admin)
        .expect(200);
      expect(_.omit(response.body.data, 'password')).to.containDeep(
        _.omit(admin, 'password'),
      );
      const result = await userRepo.findById(response.body.data.id);
      expect(_.omit(result, ['id', 'password'])).to.containDeep(
        _.omit(admin, 'password'),
      );
    });

    it('auth fails for incorrect email and password', async () => {
      const response = await client
        .post(`/signin`)
        .send({
          email: 'root@demo.com',
          password: 'password',
        })
        .expect(200);
      expect(response.body.message).to.eql('Invalid user credentials');
    });

    it('login as admin successfully', async () => {
      const credentials = givenAdminCredentials();
      const response: supertest.Response = await client
        .post(`/signin`)
        .send(credentials)
        .expect(200);
      token = response.body.data.token;
      expect(response.body.message).to.eql('User credential is valid');
    });

    it('able to access /whoami API endpoint with user details', async () => {
      await client
        .get('/whoami')
        .set({Authorization: `Bearer ${token}`})
        .expect(200);
    });
  });

  context('Scenario 2: Signing up as user', () => {
    it('creates user account', async () => {
      const user = givenUser();
      const response: supertest.Response = await client
        .post(`/signup`)
        .send(user)
        .expect(200);
      expect(_.omit(response.body.data, 'password')).to.containDeep(
        _.omit(user, 'password'),
      );
      userId = response.body.data.id;
      const result = await userRepo.findById(response.body.data.id);
      expect(_.omit(result, ['id', 'password'])).to.containDeep(
        _.omit(user, 'password'),
      );
    });

    it('fails when user is not active', async () => {
      const credentials = givenUserCredentials();
      const response = await client
        .post(`/signin`)
        .send(credentials)
        .expect(200);
      expect(response.body.message).to.eql('User is not active yet');
    });

    it('activates new registered user', async () => {
      await client
        .patch(`/user/${userId}`)
        .set({Authorization: `Bearer ${token}`})
        .send({isActive: true})
        .expect(200);
    });

    it('login as user', async () => {
      const credentials = givenUserCredentials();
      const response = await client
        .post(`/signin`)
        .send(credentials)
        .expect(200);

      expect(response.body.message).to.eql('User credential is valid');
    });
  });

  context('Scenario 3: Update user details', () => {
    it('updates the user first name and last name', async () => {
      const updatedUser = givenUser({
        firstName: 'John -edited',
        lastName: 'Doe -edited',
      });
      await client
        .patch(`/user/${userId}`)
        .set({Authorization: `Bearer ${token}`})
        .send(_.omit(updatedUser, 'password'))
        .expect(200);

      const response = await client
        .get(`/users/list`)
        .set({Authorization: `Bearer ${token}`})
        .expect(200);

      const user = response.body.data[1];
      expect(user).to.containEql(_.omit(updatedUser, 'password'));
    });

    it('delete the user', async () => {
      const response = await client
        .del(`/user/${userId}`)
        .set({Authorization: `Bearer ${token}`})
        .expect(200);

      expect(response.body.status).to.be.true();
      expect(response.body.message).to.eql('User has been deleted');
    });
  });
});

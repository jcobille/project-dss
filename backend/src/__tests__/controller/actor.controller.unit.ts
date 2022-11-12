import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ActorController} from '../../controllers';
import {Actor} from '../../models';
import {ActorRepository, MovieRepository} from '../../repositories';
import {givenActor} from '../helpers';

let controller: ActorController;
let anActor: Actor;
let anActorWithId: Actor;
let aChangedActor: Actor;
let aListOfActors: Actor[];

describe('ActorController', () => {
  let actorRepo: StubbedInstanceWithSinonAccessor<ActorRepository>;
  let movieRepo: StubbedInstanceWithSinonAccessor<MovieRepository>;
  beforeEach(givenStubbedRepository);

  it('creates a Actor', async () => {
    const create = actorRepo.stubs.create;
    create.resolves(anActorWithId);
    const response = await controller.create(anActor);
    expect(response.data).to.eql(anActorWithId);
    sinon.assert.calledWith(create, anActor);
  });

  it('returns a actor details', async () => {
    const findById = actorRepo.stubs.findById;
    findById.resolves(anActorWithId);
    const response = await controller.findById(anActorWithId.id);
    expect(response.data).to.eql(anActorWithId);
    sinon.assert.calledWith(findById, anActorWithId.id);
  });

  it('returns multiple actors if they exist', async () => {
    const find = actorRepo.stubs.find;
    find.resolves(aListOfActors);
    const response = await controller.getActors();
    expect(response.data).to.eql(aListOfActors);
    sinon.assert.called(find);
  });

  it('successfully updates existing actor', async () => {
    const updateById = actorRepo.stubs.updateById;
    updateById.resolves();
    await controller.updateById(anActorWithId.id, aChangedActor);
    sinon.assert.calledWith(updateById, anActorWithId.id, aChangedActor);
  });

  it('successfully deletes existing actor', async () => {
    const deleteById = actorRepo.stubs.deleteById;
    deleteById.resolves();
    await controller.deleteById(anActorWithId.id);
  });

  function givenStubbedRepository() {
    actorRepo = createStubInstance(ActorRepository);

    anActor = givenActor();
    anActorWithId = givenActor({
      id: '6369cfea0b3b672640686e7c',
    });
    aListOfActors = [
      anActorWithId,
      givenActor({
        id: '6369cf9f6b314926684a432e',
        firstName: 'Dwayne',
        lastName: 'Johnson',
        gender: 'Male',
        age: 50,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg',
      }),
    ] as Actor[];
    aChangedActor = givenActor({
      id: anActorWithId.id,
      firstName: 'Dwayne -edited',
    });
    controller = new ActorController(movieRepo, actorRepo);
  }
});

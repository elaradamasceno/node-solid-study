import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from './fatch-nearby-gyms';
import { farGymCoordinates, myCoordinates } from '@/enum/test/latitude-and-longitude.enum';


let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: myCoordinates.latitude,
      longitude: myCoordinates.longitude
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: farGymCoordinates.latitude,
      longitude: farGymCoordinates.longitude
    });

    const { gyms } = await sut.execute({
      userLatitude: myCoordinates.latitude,
      userLongitude: myCoordinates.longitude
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' })
    ]);
  });
});

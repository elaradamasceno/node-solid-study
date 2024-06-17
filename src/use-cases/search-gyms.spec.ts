import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gym';
import { myCoordinates } from '@/enum/test/latitude-and-longitude.enum';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search  Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    const gymOne = await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: myCoordinates.latitude,
      longitude: myCoordinates.longitude
    });

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: myCoordinates.latitude,
      longitude: myCoordinates.longitude
    });

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' })
    ]);
    expect(gyms).toEqual([
      gymOne
    ]);
  });

  it('should be able to fatch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++){
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: myCoordinates.latitude,
        longitude: myCoordinates.longitude
      });
    }
    
    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21'}),
      expect.objectContaining({ title: 'JavaScript Gym 22'}),
    ]);
  });
});

import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';
import { myCoordinates } from '@/enum/test/latitude-and-longitude.enum';


let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;
let latitude: number;
let longitude: number;

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);
    latitude = myCoordinates.latitude;
    longitude = myCoordinates.longitude;

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia JavaScript',
      description: '',
      phone: '',
      latitude: latitude,
      longitude: longitude,
    })

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: latitude,
      userLongitude: longitude
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: latitude,
      userLongitude: longitude
    });

    await expect(() => 
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: latitude,
        userLongitude: longitude
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: latitude,
      userLongitude: longitude
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const {checkIn} = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: latitude,
      userLongitude: longitude
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Academia NodeJs',
      description: '',
      phone: '',
      latitude: -21.1964719,
      longitude: -47.8129218,
    });

    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: latitude,
      userLongitude: longitude
    })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});

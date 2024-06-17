import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsUseCase } from './get-user-metrics';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  const userId = 'user-01';

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    const gymName01 = 'gym-01';
    const gymName02 = 'gym-02';

    const gymOne = await checkInsRepository.create({
      gym_id: gymName01,
      user_id: userId
    });

    const gymTwo = await checkInsRepository.create({
      gym_id: gymName02,
      user_id: userId
    });

    const { checkInsCount } = await sut.execute({
      userId: userId,
    });

    expect(checkInsCount).toEqual(2);
  });
});

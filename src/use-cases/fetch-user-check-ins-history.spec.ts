import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe('Fetch User Check-ins History Use Case', () => {
  const userId = 'user-01';

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it('should be able to fatch check in history', async () => {
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

    const { checkIns } = await sut.execute({
      userId: userId,
      page: 1
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: gymName01 }),
      expect.objectContaining({ gym_id: gymName02 })
    ]);
    expect(checkIns).toEqual([
      gymOne, gymTwo
    ]);
  });

  it('should be able to fatch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++){
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: userId
      });
    }
    
    const { checkIns } = await sut.execute({
      userId: userId,
      page: 2
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21'}),
      expect.objectContaining({ gym_id: 'gym-22'}),
    ]);
  });
});

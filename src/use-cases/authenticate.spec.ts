import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { userData } from '@/enum/test/users.enum';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: userData.name,
      email: userData.email,
      password_hash: await hash(userData.password, 6)
    });

    const { user } = await sut.execute({
      email: userData.email,
      password: userData.password
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: userData.email,
      password: userData.password
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: userData.name,
      email: userData.email,
      password_hash: await hash(userData.password, 6)
    })

    await expect(() => sut.execute({
      email: userData.email,
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});

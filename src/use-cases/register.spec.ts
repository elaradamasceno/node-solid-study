import { expect, describe, it, test, beforeEach } from 'vitest';
import { RegisterUserCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { userData } from '@/enum/test/users.enum';


let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserCase(usersRepository);
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: userData.name,
      email: userData.email,
      password: userData.password
    });

    const isPasswordCorrectlyHashed = await compare(userData.password, user.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: userData.name,
      email: userData.email,
      password: userData.password
    });

    await expect(() =>
      sut.execute({
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: userData.name,
      email: userData.email,
      password: userData.password
    });

    expect(user.id).toEqual(expect.any(String));
  });
});

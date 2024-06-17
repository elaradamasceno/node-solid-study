import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUserCase } from "../register";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUserCase(prismaUsersRepository);

  return useCase;
}
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsUseCaseeProps {
  query: string;
  page: number;
}

interface SearchGymsUseCaseeResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository){};

  async execute({ query, page }: SearchGymsUseCaseeProps): Promise<SearchGymsUseCaseeResponse> {
   const gyms = await this.gymsRepository.searchMany(query, page);

   return {
    gyms
   }
  }
}
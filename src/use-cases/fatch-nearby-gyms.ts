import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsUseCaseProps {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository){};

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseProps): Promise<FetchNearbyGymsUseCaseResponse> {
   const gyms = await this.gymsRepository.findManyNearby({
    latitude: userLatitude,
    longitude: userLongitude
   });

   return {
    gyms
   }
  }
}
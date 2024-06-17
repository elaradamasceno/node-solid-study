import { userType } from "@/enum/test/users.enum";
import { UserType } from "@/types/user-types";
import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(role: UserType) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if(role !== userType.admin){
      return reply.status(401).send({ message: 'Unauthorized.'});
    }
  }
}
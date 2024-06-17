import { userData, userType } from '@/enum/test/users.enum';
import { prisma } from '@/lib/prisma';
import { UserType } from '@/types/user-types';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

interface CreateAndAuthenticateUserProps {
  app: FastifyInstance,
  role?: UserType
}

export async function createAndAuthenticateUser({ app, role = userType.member}: CreateAndAuthenticateUserProps) {
  const email = userData.email;
  const password = userData.password;

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email,
      password_hash: await hash('123456', 6),
      role
    }
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email,
      password
    });

  const { token } = authResponse.body;

  return {
    token
  };
}
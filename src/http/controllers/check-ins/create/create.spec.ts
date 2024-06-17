import request from 'supertest';

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { myCoordinates } from '@/enum/test/latitude-and-longitude.enum';
import { prisma } from '@/lib/prisma';


describe('Create Check-In (e2e)', () => {
  beforeAll(async() => {
    await app.ready();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser({ app });

    const gym = await prisma.gym.create({
      data: {
        title: 'New Gym',
        latitude: myCoordinates.latitude,
        longitude: myCoordinates.longitude
      }
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: myCoordinates.latitude,
        longitude: myCoordinates.longitude
      });

    expect(response.status).toEqual(201);
  })
})
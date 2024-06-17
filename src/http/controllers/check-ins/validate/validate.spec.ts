import request from 'supertest';

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { myCoordinates } from '@/enum/test/latitude-and-longitude.enum';
import { prisma } from '@/lib/prisma';
import { userType } from '@/enum/test/users.enum';


describe('Validate Check-In (e2e)', () => {
  beforeAll(async() => {
    await app.ready();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser({ app, role: userType.admin});
    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: 'New Gym',
        latitude: myCoordinates.latitude,
        longitude: myCoordinates.longitude
      }
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  })
})
import request from 'supertest';

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { myCoordinates } from '@/enum/test/latitude-and-longitude.enum';
import { userType } from '@/enum/test/users.enum';


describe('Create Gym (e2e)', () => {
  beforeAll(async() => {
    await app.ready();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser({app, role: userType.admin});

    const payload = {
      title: 'JavaScript Gym',
      description: 'Some description',
      phone: '1699999999',
      latitude: myCoordinates.latitude,
      longitude: myCoordinates.longitude
    }


    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(response.status).toEqual(201);
  })
})
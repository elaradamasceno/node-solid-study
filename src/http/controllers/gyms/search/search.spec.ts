import request from 'supertest';

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { myCoordinates } from '@/enum/test/latitude-and-longitude.enum';
import { userType } from '@/enum/test/users.enum';


describe('Search Gyms (e2e)', () => {
  beforeAll(async() => {
    await app.ready();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('should be able seach gyms by title', async () => {
    const { token } = await createAndAuthenticateUser({ app, role: userType.admin });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym - One',
        description: 'Some description',
        phone: '1699999999',
        latitude: Number(myCoordinates.latitude),
        longitude: Number(myCoordinates.longitude)
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym - Two',
        description: 'Some description',
        phone: '1699999999',
        latitude: Number(myCoordinates.latitude),
        longitude: Number(myCoordinates.longitude)
      });


    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'One'
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym - One'
      })
    ]);
  })
})
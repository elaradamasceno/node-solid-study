import request from 'supertest';

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { farGymCoordinates, myCoordinates } from '@/enum/test/latitude-and-longitude.enum';
import { userType } from '@/enum/test/users.enum';


describe('Nearby Gyms (e2e)', () => {
  beforeAll(async() => {
    await app.ready();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser({ app, role: userType.admin });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near Gym',
        description: 'Some Description',
        phone: '16999999999',
        latitude: myCoordinates.latitude,
        longitude: myCoordinates.longitude 
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        description: 'Some Description',
        phone: '16999999999',
        latitude: farGymCoordinates.latitude,
        longitude: farGymCoordinates.longitude 
      });


    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: myCoordinates.latitude,
        longitude: myCoordinates.longitude
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym'
      })
    ]);
  })
})
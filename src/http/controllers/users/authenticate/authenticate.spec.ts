import request from 'supertest';

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { userData } from '@/enum/test/users.enum';


describe('Authenticate (e2e)', () => {
  beforeAll(async() => {
    await app.ready();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {   
    await request(app.server)
      .post('/users')
      .send({
        name: userData.name,
        email: userData.email,
        password: userData.password
      });

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: userData.email,
        password: userData.password
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String)
    });
  })
})
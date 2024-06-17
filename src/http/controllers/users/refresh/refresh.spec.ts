import request from 'supertest';

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { userData } from '@/enum/test/users.enum';


describe('Refresh token (e2e)', () => {
  beforeAll(async() => {
    await app.ready();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh token', async () => {   
    await request(app.server)
      .post('/users')
      .send({
        name: userData.name,
        email: userData.email,
        password: userData.password
      });

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: userData.email,
        password: userData.password
      });

    const getCookies = authResponse.get('Set-Cookie') as string[];
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', getCookies)
      .send()

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String)
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})
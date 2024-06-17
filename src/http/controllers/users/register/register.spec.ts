import request from 'supertest';

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { userData } from '@/enum/test/users.enum';

describe('Register (e2e)', () => {
  beforeAll(async() => {
    await app.ready();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: userData.name,
        email: userData.email,
        password: userData.password
      });

    expect(response.statusCode).toEqual(201);
  })
})
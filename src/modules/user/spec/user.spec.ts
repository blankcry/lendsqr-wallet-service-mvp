// user.test.ts
import request from 'supertest';
import {faker} from '@faker-js/faker';
import app from '../../../app'; // Your app instance

describe('User Tests', () => {
  it('should create a user and set token', async () => {
    const response = await request(app).post('/user').send({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });

    expect(response.statusCode).toBe(201);
  });
});

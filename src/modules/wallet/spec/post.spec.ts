import request from 'supertest';
import app from '../../../app'; // Assuming your Express app is exported from app.ts
import {faker} from '@faker-js/faker/.';
let token: string;
let recipient_id: number;
beforeAll(async () => {
  const response = await request(app).post('/user').send({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  });

  expect(response.statusCode).toBe(201);
  token = response.body.data.token; // Assuming the token comes in the response

  const contactResponse = await request(app)
    .get('/user/contacts')
    .set('Authorization', `Bearer ${token}`); // Assuming you have token auth
  expect(contactResponse.statusCode).toBe(200);
  expect(contactResponse.body).toHaveProperty('data');
  expect(Array.isArray(contactResponse.body.data)).toBe(true);
  expect(contactResponse.body.data[0]).toHaveProperty('id');
  recipient_id = contactResponse.body.data[0].id;

  console.log(token, recipient_id);
});
describe('Wallet Service Routes', () => {
  // Test for funding the wallet
  describe('POST /wallet/fund', () => {
    it('should fund the user wallet', async () => {
      const response = await request(app)
        .post('/wallet/fund')
        .send({
          amount: 10000,
        })
        .set('Authorization', `Bearer ${token}`); // Assuming you have token auth
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('status', 'SUCCESS');
    });
  });
  // // Test for transferring funds
  describe('POST /wallet/transfer', () => {
    it('should transfer funds between wallets', async () => {
      // const recipientId = 2; // Assume recipientId 2 exists
      const response = await request(app)
        .post('/wallet/transfer')
        .send({
          amount: 5000,
          recipient_id,
        })
        .set('Authorization', `Bearer ${token}`); // Assuming you have token auth
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('status', 'SUCCESS');
    });
  });
  // // Test for withdrawing funds
  describe('POST /wallet/withdraw', () => {
    it('should withdraw funds from the user wallet', async () => {
      const response = await request(app)
        .post('/wallet/withdraw')
        .send({
          amount: 4000,
        })
        .set('Authorization', `Bearer ${token}`); // Assuming you have token auth
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('status', 'SUCCESS');
    });
  });
  describe('POST /wallet/transfer', () => {
    it('Transfer funds between wallets should fail', async () => {
      // const recipientId = 2; // Assume recipientId 2 exists
      const response = await request(app)
        .post('/wallet/transfer')
        .send({
          amount: 100000,
          recipient_id,
        })
        .set('Authorization', `Bearer ${token}`); // Assuming you have token auth
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'message',
        'Insufficient Wallet Balance'
      );
    });
  });
  // // Test for withdrawing funds
  describe('POST /wallet/withdraw', () => {
    it('Withdraw funds from the user wallet should fail', async () => {
      const response = await request(app)
        .post('/wallet/withdraw')
        .send({
          amount: 100000,
        })
        .set('Authorization', `Bearer ${token}`); // Assuming you have token auth
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'message',
        'Insufficient Wallet Balance'
      );
    });
  });
});

import request from 'supertest';
import express from 'express';
import * as routes from '../src/routes'; 

const app = express();
app.use(express.json());
app.use('/api/users', routes.UserRouters);


describe('User API Endpoints', () => {
  
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
        const newUser = {
            name: "New User",
            lastname: "lastname",
            email:"newuser2@example.com"
        };

        const response = await request(app)
            .post('/api/users')
            .send(newUser)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('name', 'New User');
        expect(response.body.user).toHaveProperty('lastname', 'lastname');
        expect(response.body.user).toHaveProperty('email', 'newuser2@example.com');
        expect(response.body).toHaveProperty('token');
    });
  });

  describe('GET /api/users/:email', () => {
    it('should return user and token details', async () => {
      const email = 'newuser2@example.com';
      const response = await request(app)
          .get(`/api/users/${email}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('name', 'New User');
        expect(response.body.user).toHaveProperty('lastname', 'lastname');
      expect(response.body.user).toHaveProperty('email', email);
      expect(response.body).toHaveProperty('token');
    });
  });

  
})

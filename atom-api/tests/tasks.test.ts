import request from 'supertest';
import { generateToken } from '../src/middlewares/ValidateAuth'; 
import express from 'express';
import * as routes from '../src/routes'; 

const app = express();
app.use(express.json());
app.use('/api/tasks', routes.TaskRouters);


describe('Task API Endpoints', () => {
    let token: string;
    let createdTaskId: string;

    beforeAll(() => {
        token = generateToken("newuser2@example.com");
    });

    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const newTask = {
                title: "New Task",
                description: "Description of the new task",
                statusComplete:false
            };

            const response = await request(app)
                .post('/api/tasks') 
                .set('Authorization', `Bearer ${token}`)
                .send(newTask);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('title', 'New Task');
            expect(response.body).toHaveProperty('description', 'Description of the new task');
            createdTaskId = response.body.id;
        });
    });

    
    describe('GET /api/tasks', () => {
        it('should get all tasks', async () => {
            const response = await request(app)
                .get('/api/tasks') 
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('PUT /tasks/:id', () => {
        it('should update an existing task', async () => {
            const updateData = {
                title: "Updated Task",
                description: "Updated description",
                completed: true,
            };

            const response = await request(app)
                .put(`/api/tasks/${createdTaskId}`) 
                .set('Authorization', `Bearer ${token}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', 'Updated Task');
            expect(response.body).toHaveProperty('description', 'Updated description');
            expect(response.body).toHaveProperty('completed', true); 
        });

        it('should return 404 for a non-existent task', async () => {
            const nonExistentId = "nonexistentId"; 

            const response = await request(app)
                .put(`/api/tasks/${nonExistentId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ title: "Some Title" });
            
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Task not found'); 
        });
    });
});

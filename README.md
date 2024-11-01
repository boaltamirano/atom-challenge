# Atom Callenge

This application should allow the user to perform the following actions:
- Create and get users
- Add, edit and delete tasks
- Mark tasks as completed

## Technologies Used
- **Angular:** Frontend development framework used to create the application's user interface.
- **Express:** Node.js framework used to build the API that will manage the CRUD (Create, Read, Update, Delete).
- **TypeScript:** Programming language that adds static typing to JavaScript, used in both the frontend and backend to improve code quality and avoid common errors.
- **Swagger:** Documentation tool for APIs. Allows you to generate and visualize API documentation created with Express, making it easier for other developers to understand and consume the available endpoints.

### API Security
To protect access to the API and ensure that only authenticated users can perform operations on it, an **authorization system based on JWT tokens** (JSON Web Tokens) has been implemented. The applied security configuration is detailed below:
- **Authentication with JWT:** Each authenticated user receives a JWT token that must be included in the requests to the API. This token contains the user's information and is required to access the protected endpoints, it has an expiration date of 10 days .
- **Asymmetric Security Keys:** JWT authentication uses a public and private key scheme 

### Tests
- **ts-jest:** Library that allows to use Jest with TypeScript, to write and execute unit and integration tests in the backend.
- **Supertest:** Library to perform HTTP endpoint testing, used in conjunction with Jest to verify that API endpoints behave correctly.

### Deployment
- **Frontend:** The frontend application is deployed using     **Firebase Hosting**, a service that allows hosting web applications in a secure and scalable way.
- **Backend:** The backend API is deployed on **Firebase Functions**, leveraging a serverless environment.

## API Documentation:

Detailed API documentation is available at: [ATOM API](https://api-ej7wdqyyta-uc.a.run.app/api/docs/)

## Working in local service
- [Backend ](./atom-api/README.md)
- [Frontend](./atom-front/README.md)
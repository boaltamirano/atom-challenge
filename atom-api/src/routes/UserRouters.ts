import { Router } from "express";
import { createUser, getUserByEmail } from "../controllers";
import { validateCreate, verificarToken } from "../middlewares";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User related operations
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creation of a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: vsOOP8ShV6p3ciy7ZhKI
 *                   name:
 *                     type: string
 *                     example: "user"
 *                   lastname:
 *                     type: string
 *                     example: "new"
 *                   email:
 *                     type: string
 *                     example: "test1@test.com"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-10-30 09:10:40"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-10-30 09:10:40"
 *       500:
 *         description: Internal server error
 */
router.post("", validateCreate, createUser);

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Returns user and token information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: user@example.com
 *         description: E-mail address of the user to be searched
 *     responses:
 *       200:
 *         description: User and token details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: vsOOP8ShV6p3ciy7ZhKI
 *                     name:
 *                       type: string
 *                       example: "user"
 *                     lastname:
 *                       type: string
 *                       example: "new"
 *                     email:
 *                       type: string
 *                       example: "test1@test.com"
 *                     createdAt:
 *                       type: string
 *                       example: "2024-10-30 09:10:40"
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-10-30 09:12:16"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWF0IjoxNzMwMjMxMTg4LCJleHAiOjE3MzEwOTUxODh9.wRGKCqXLZe3JzTW8IfOowG2zK9vX6Zp86BoUYEFG0bA"
 *       404:
 *         description: User not found      
 *       500:
 *         description: Internal server error
*/
router.get("/:email", getUserByEmail);

export { router as UserRouters };
import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers";
import { validateCreateTask, verificarTokenPrivate } from "../middlewares";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task related operations
*/

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creation of a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               statusComplete:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 3aKOJGEH9vi6vK7TcT1X
 *                   title:
 *                     type: string
 *                     example: "Tarea 1"
 *                   description:
 *                     type: string
 *                     example: "Descripcion de la tarea"
 *                   userEmail:
 *                     type: string
 *                     example: "test@example.com"
 *                   statusComplete:
 *                     type: string
 *                     example: "false"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-10-30 10:28:56"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-10-31 10:28:56"
 *       401:
 *         description: Authentication token not provided
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
*/
router.post("", validateCreateTask, verificarTokenPrivate, createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks
 *     description: Returns a list of tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 3aKOJGEH9vi6vK7TcT1X
 *                   title:
 *                     type: string
 *                     example: "Tarea 1"
 *                   description:
 *                     type: string
 *                     example: "Descripcion de la tarea"
 *                   userEmail:
 *                     type: string
 *                     example: "test@example.com"
 *                   statusComplete:
 *                     type: string
 *                     example: "false"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-10-30 10:28:56"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-10-30 10:28:56"
 *       401:
 *         description: Authentication token not provided
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.get("",verificarTokenPrivate, getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     description: Updating a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               statusComplete:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 3aKOJGEH9vi6vK7TcT1X
 *                   title:
 *                     type: string
 *                     example: "Tarea 1"
 *                   description:
 *                     type: string
 *                     example: "Descripcion de la tarea"
 *                   userEmail:
 *                     type: string
 *                     example: "test@example.com"
 *                   statusComplete:
 *                     type: string
 *                     example: "false"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-10-30 10:28:56"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-10-30 10:30:27"
 *       401:
 *         description: Authentication token not provided
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id",verificarTokenPrivate, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Elimination of a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task successfully eliminated
 *       401:
 *         description: Authentication token not provided
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id",verificarTokenPrivate, deleteTask);


export { router as TaskRouters };
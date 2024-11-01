import { Request, Response } from 'express';
import { TaskRepository } from '../repositories';

const taskRepository = new TaskRepository;

export const createTask = async (req: Request, res: Response) => {
    try {
        const userEmail = (req as any).userEmail;
        req.body['userEmail'] = userEmail;
        req.body['statusComplete'] = req.body['statusComplete'] === 'true' || req.body['statusComplete'] === true ? true : false;
        const id = await taskRepository.createTask(req.body);
        const task = await taskRepository.findTask(id);
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const userEmail = (req as any).userEmail;
        const tasks = await taskRepository.getTasks(userEmail);
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
};


export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userEmail = (req as any).userEmail;
        const task = await taskRepository.findTask(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if(task.userEmail != userEmail){
            return res.status(403).json({ message: "Permission denied" });
        }
        await taskRepository.updateTask(id, req.body);
        const taskUpdate = await taskRepository.findTask(id);
        return res.status(200).json(taskUpdate);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userEmail = (req as any).userEmail;
        const task = await taskRepository.findTask(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if(task.userEmail != userEmail){
            return res.status(403).json({ message: "Permission denied" });
        }
        await taskRepository.deleteTask(id);
        return res.status(200).json({ message: "Task successfully eliminated" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
};
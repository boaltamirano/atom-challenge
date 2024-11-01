import { Request, Response } from 'express';
import { UserRepository } from '../repositories';
import { generateToken } from '../middlewares';

const userRepository = new UserRepository();

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = generateToken(email);
        return res.status(200).json({user: user, token: token});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const id = await userRepository.createUser(req.body) ;
        const user = await userRepository.getUserById(id );
        const token = generateToken(req.body.email);
        res.status(201).json({ user: user, token: token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
};

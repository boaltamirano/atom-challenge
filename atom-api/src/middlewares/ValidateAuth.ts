import jwt, { JwtPayload } from "jsonwebtoken"
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from 'express';
import config from '../shared/config/env'

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        // const verification = req.headers['x-token']
        // console.log(verification)
        const token = authHeader ? authHeader.split(' ').pop() || '' : '';
        if (token) {
            // const tokena = jwt.sign({ email: "test@gmail.com"  }, config.SECRET_TOKEN, { algorithm: 'HS256', expiresIn: '10d' });
            // console.log(tokena)

            jwt.verify(token, config.SECRET_TOKEN, { algorithms: ['HS256'] }, (e, decoded: JwtPayload | string | undefined) => {
                if (e) {
                    return res.status(401).json({ message: "Invalid Token" });
                }
                return next();
            });
            return next();
        } else {
            return res.status(401).json({ message: "No authorization" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Error verifying token" });
    }
};

export const verificarTokenPrivate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(' ').pop() || '' : '';
        if (token) { 
            const userEmail = getEmailFromToken(token);
            if (!userEmail) {
                    return res.status(403).json({ message: "Invalid Token" });
            }
            (req as any).userEmail = userEmail; 
            return next();
        } else {
            return res.status(401).json({ message: "No authorization" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export function generateToken(email: string): string {
    const payload = { email };
    const privateKey = fs.readFileSync(path.join(__dirname, '../../', config.PRIVATE_KEY), 'utf8');
    const token = jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: "10d" });
    return token;
}

export function getEmailFromToken(token: string): string | null {
    try {
        const publicKeyPath = config.PRIVATE_KEY
        const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] }) as { email: string };
        return decoded.email;
    } catch (error) {
        return null
    }
}
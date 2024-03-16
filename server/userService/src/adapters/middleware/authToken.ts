import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface AuthenticatedRequest extends Request {
    user?: any; 
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    jwt.verify(token, "secret_key" as string, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;

// lib/auth.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

export const verifyToken = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token yok' });

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET!);
            (req as any).user = user;
            return handler(req, res);
        } catch (err) {
            return res.status(403).json({ message: 'Token geçersiz' });
        }
    };
};

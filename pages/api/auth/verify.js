import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method === "GET") {
        const token = req.headers.authorization;
        const verifiedToken = verifyToken(token);
        if (verifiedToken) {
            res.status(200).json(verifiedToken);
        } else {
            res.status(401).json({ status: { code: 401, message: "unauthorized" } })
        }
    }
}
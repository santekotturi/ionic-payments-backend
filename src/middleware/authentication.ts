import { Request, Response } from 'express';
import { decode } from 'jwt-simple';
import { ITokenRequest } from '../types/Request'




let jwtAuthentication = (req: ITokenRequest, res: Response, next: Function) => {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {

        let token = req.headers['x-auth-token'];
        console.log('auth token -> ', token);
        if (token) {
            let decoded = decode(token, 'SUPER_SECRET')
            req.decodedToken = decoded;
            next()
        } else {
            return res.status(403).json({
                success: false,
                message: 'No token provided',
                code: 3         // 1 = db error. 2 = user dne in db. 3 = failed to auth. 4 = no token.
            });
        }
    }
}



export default jwtAuthentication;

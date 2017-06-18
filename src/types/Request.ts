import { Request } from 'express';

export interface ITokenRequest extends Request {
    decodedToken: any
}
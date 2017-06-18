import { Router, Request, Response } from 'express';
import * as cors from 'cors';
import UserService from '../services/user';
import jwtAuthentication from '../middleware/authentication';
import { ITokenRequest } from '../types/Request';


console.log('loaded user routes')

const user: Router = Router();
const userService = new UserService();

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: false,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  // origin: API_URL,
  preflightContinue: false
};

//use cors middleware
user.use(cors(options));

//enable pre-flight
user.options("*", cors(options));

/* GET user listing. */
user.get('/', (req: Request, res: Response, next: Function) => {
  res.send({ user: 'foo' });
});

user.post('/signup', (req: Request, res: Response, next: Function) => {
  userService.createUser(req.body)
    .then((user) => res.status(200).json({ user, status: 'success' })
    , (error) => res.status(401).json({ error, status: 'fail' }))
});

user.post('/login', (req: Request, res: Response, next: Function) => {
  userService.login(req.body)
    .then((user) => res.status(200).json({ user, status: 'success' })
    , (err) => res.status(401).json({ err, status: 'fail' }))
});

/* protect all routes from here on with jwt auth */
user.use(jwtAuthentication)

user.get('/test', (req: ITokenRequest, res: Response, next: Function) => {
  console.log('DECODED TOKEN! ', req.decodedToken.email);
  res.status(200).end()
})


export default user;

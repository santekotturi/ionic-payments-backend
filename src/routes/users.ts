import { Router } from 'express';
import * as cors from 'cors';

const users:Router = Router();

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: false,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  // origin: API_URL,
  preflightContinue: false
};

//use cors middleware
users.use(cors(options));

//enable pre-flight
users.options("*", cors(options));

/* GET users listing. */
users.get('/', function(req, res, next) {
  res.send({user: 'foo'});
});

export default users;

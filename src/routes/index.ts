import { Router } from 'express';
import * as cors from 'cors';

const index: Router = Router();

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: false,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  // origin: API_URL,
  preflightContinue: false
};

//use cors middleware
index.use(cors(options));

//enable pre-flight
index.options("*", cors(options));


//add your routes

/* base endpoint */
index.get('/', function(req, res, next) {
  res.send({hello: 'world'})
});

export default index;

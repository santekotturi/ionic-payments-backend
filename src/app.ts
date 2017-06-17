import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import index from './routes/index';
import users from './routes/users';
import cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet

const app: express.Express = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use((error: any, req, res, next) => {
    res.status(error['status'] || 500);
    res.json({
      message: error.message,
      error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  res.status(error['status'] || 500);
  res.json({
    message: error.message,
    error: {}
  });
  return null;
});


export default app;
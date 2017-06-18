
let config = {}

if (process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'development') {
    config['DB_URI'] = 'mongodb://localhost:27017/ionic-payments';
    config['TOKEN_SECRET'] = 'this_is_a_great_secret';
    config['SALT'] = 'this_is_a_great_salt';
}
else if (process.env.NODE_ENV === 'test' ||
    process.env.NODE_ENV === 'prod') {
    config['DB_URI'] = process.env.MONGODB_URI;
    config['TOKEN_SECRET'] = process.env.TOKEN_SECRET;
    config['SALT'] = process.env.SALT;
}
else {
    console.error('ERROR: ENV not set to dev, test or prod. Exiting.')
    process.exit();
}

export default config;
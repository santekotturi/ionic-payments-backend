import { MongoClient } from 'mongodb';
import config from './config';

const DB_URI: string = config['DB_URI'];
// const DB_NAME: string = 'ionic-payments';

let db = {
    connection: null
};

export let connect = function () {
    return new Promise(function (resolve, reject) {
        if (db.connection) {
            resolve()
        } else {
            MongoClient.connect(DB_URI, function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    db.connection = connection
                    resolve()
                }
            })
        }
    })
}

export let get = function () {
    return db.connection
}

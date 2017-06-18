import _ from 'lodash';
import { get as getConnection } from '../config/db';
import { ObjectID } from 'mongodb'
import { ILoginCredentials } from '../types/LoginCredentials';



console.log('loaded user model')

interface IUser {
    _id: ObjectID,
    firstname: string,
    lastname: string,
    email: string,
    password: string

}

class UserModel {
    user: IUser
    db: any

    constructor() {
    }

    createUser(userJSON) {
        this.db = getConnection();
        return new Promise((resolve, reject) => {
            console.log('user json to save -> ', userJSON);
            this.db.collection('users').insertOne(userJSON, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    this.user = doc.ops[0]      // contains the actual doc data
                    resolve(this.user)
                }
            })
        })
    }

    login(credentials: ILoginCredentials) {
        this.db = getConnection();
        return new Promise((resolve, reject) => {
            let query = {
                email: credentials.email,
                password: credentials.password
            }
            this.db.collection('users').findOne(query, (err, doc) => {
                if(err){
                    reject(err)
                }
                else {
                    console.log('logged in user ', doc)
                    resolve(doc)
                }
            })
        })
    }
}

export default UserModel;
import { encode } from 'jwt-simple';
import { ILoginCredentials } from '../types/LoginCredentials';


import UserModel from '../models/user';

console.log('loaded user service')

const userModel = new UserModel();

class UserService {
    user: any

    constructor() {

    }

    createUser(userJSON) {
        return new Promise((resolve, reject) => {
            userModel
                .createUser(userJSON)
                .then((user) => {
                    this.user = user
                    this._generateToken()
                    resolve(user)
                }, (err) => reject(err))
        }
        )
    }

    _generateToken() {
        this.user.token = encode(this.user, 'SUPER_SECRET')
        console.log('Token -> ', this.user.token)
    }

    login(credentials: ILoginCredentials) {
        return new Promise((resolve, reject) => {
            userModel.login(credentials)
            .then((user) => {
                this.user = user
                this._generateToken()
                resolve(user)
            }, (err) => reject(err))
        })
    }

}

export default UserService;
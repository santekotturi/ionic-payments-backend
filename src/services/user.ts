import { encode } from 'jwt-simple'
import { ILoginCredentials } from '../types/LoginCredentials'
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

    processCheckout(data) {
        const stripe = require('stripe')(process.env.STRIPE_SK)
        return new Promise((resolve, reject) => {
            let token = data.stripeToken
            let amount = data.amount
            
            stripe.charges.create({
                amount: amount,
                currency: 'usd',
                description: "Example charge",
                source: token,
            }, function (err, charge) {
                if(err) {
                    console.error(err)
                    reject(err)
                } else resolve(charge)
            })
        })
    }
}

export default UserService;
var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = require("mongoose").Schema;
const userSchema = Schema({
    username: String,
    password: String,
}, {
    collection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const makeHash = async (plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const insertUser1 = (dataUser) => {
    return new Promise((resolve, reject) => {
        var new_user = new User({
            username: dataUser.username,
            password: dataUser.password
        });
        new_user.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert user to DB!'));
            } else {
                resolve({ message: 'Singn up successfully' });
            }
        });
    });
}
const insertUser = async (dataUser) => {
    try {
        const new_user = new User({
            username: dataUser.username,
            password: dataUser.password
        });
        const savedUser = await new_user.save();
        return { message: 'Sign up successfully' };
    } catch (error) {
        throw new Error('Cannot insert user to DB!');
    }
}


router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password).then(hashText => {
            const playload = {
                username: req.body.username, 
                password: hashText,
            }
                console.log(playload);
            insertUser(playload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
        })
            .catch(err => {
            })
    });
module.exports = router
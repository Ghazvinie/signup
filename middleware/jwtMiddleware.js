const jwt = require('jsonwebtoken');

function generateToken(id){
    const token = jwt.sign({id}, privateKey, {
        expiresIn: '24h',
    });

    return token;
}
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
    const tokenProvided = req.headers['authorization'];
    
    if(tokenProvided) {
        const token = tokenProvided.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, encoded) => {
            if(err) {
                return res.status(406).json({msg: 'Token inválido.'});
            }
            
            req.user = encoded;

            next();
        });
        return;
    }

    return res.status(406).json({msg: 'Token não fornecido.'});
}
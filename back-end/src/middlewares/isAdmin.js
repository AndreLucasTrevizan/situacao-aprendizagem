const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();''

module.exports = (req, res, next) => {
    const tokenProvided = req.headers['authorization'];
    if(tokenProvided) {
        const token = tokenProvided.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, encoded) => {
            if(err) {
                res.status(406).json({msg: 'Token inválido.'});
            } else if(encoded.funcao == 1) {
                next();
            } else {
                res.status(401).json({msg: 'Você não tem permissão para acessar aqui.'});
            }
        });
    } else {
        res.status(406).json({msg: 'Token não fornecido.'});
    }
}
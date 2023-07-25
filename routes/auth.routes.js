const {Router} = require('express');
const {check} = require('express-validator');
const {login} = require('../controllers/auth.controllers.js');
const {validateDocument} = require('../middlewares/validate.documents.js');

const router = Router();

router.post('/login', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validateDocument
] , login)

module.exports = router
const {Router} = require('express');
const {check} = require('express-validator')
const {getUsers, postUsers, deleteUsers, putUsers, patchUsers} = require('../controllers/usuario.controllers.js');
const { validateDocument } = require('../middlewares/validate.documents.js');
const Role = require('../models/rol.js');

const router = Router();

router.get("/", getUsers);
router.post("/",[
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña debe ser de minimo 6 caracteres').isLength({min: 6}),
    /* check('rol', 'El rol no existe').isIn(['ADMIN','USER']), */
    check('rol').custom(async(rol = '')=>{
        const rolExists = await Role.findOne({rol})
        if (!rolExists) {
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
        }
    }),
    validateDocument
],postUsers);
router.delete("/", deleteUsers);
router.put("/", putUsers);
router.patch("/", patchUsers);

module.exports = router;
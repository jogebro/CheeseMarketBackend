const {response} = require('express');
const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs')

const login = async (req, res=response)=>{
    const {email, password} = req.body
    try {
        //Verificar si existe el email en la base de datos
        const emailExists = await Usuario.findOne({email});

        if (!emailExists) {
            return res.status(400).json({
                msg:"Email no encontrado"
            })
        }
        //Verificar si el usario esta activo
        if (emailExists.estado === false) {
            return res.status(400).json({
                msg:"Usuario no activo"
            })
        }
        //Verificar si la contraseña es correcta y coincide con la llave
        const correctPassword = bcryptjs.compareSync(password, emailExists.password)
        if (!correctPassword) {
            return res.status(400).json({
                msg:"Contraseña incorrecta"
            })
        }

        res.json({
            msg:"Todo correcto miamor"
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: "Datos insuficientes, contacte a un superior"
        })
    }
}

module.exports = {
    login
}
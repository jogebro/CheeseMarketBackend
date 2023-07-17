const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'Name is Required']
    },

    email:{
        type: String,
        required: [true, 'Email is Required'],
        unique: [true, 'Email already exists']
    },

    password:{
        type: String,
        required: [true, 'Password is Required']
    },

    imagen:{
        type: String
    },

    rol:{
        type: String,
        required: true,
        default: 'USER',
        enum: ['ADMIN','USER']
    },

    estado:{
        type: Boolean,
        default: true
    },

    googleSignIn:{
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', UsuarioSchema);
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.js')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth";
        //Conexion DB
        this.connectDB();
        //Middlewares
        this.middleware();
        //Routes
        this.routes();
    }

    async connectDB(){
        await dbConnection()
    }

    middleware(){
        //cors
        this.app.use(cors());
        //Leer y parsear un JSON en body
        this.app.use(express.json())
        //public directory
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth.routes.js'));
        this.app.use(this.usuariosPath, require('../routes/usuario.routes.js'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Estamos en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;
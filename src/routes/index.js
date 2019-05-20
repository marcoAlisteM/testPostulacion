const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
module.exports = app =>{
    router.get('/',home.index);
    router.get('/ver/:userId',home.verPerfil)
    app.use(router);
}
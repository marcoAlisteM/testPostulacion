const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const express = require('express');
const routes = require('../routes/index');
const erroHandler = require('errorhandler'); 
module.exports = app =>{
    //setings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname,'../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'),'partials'),
        layoutsDir : path.join(app.get('views'),'layouts'),
        extname: '.hbs'
    }))
    app.set('view engine', '.hbs');
    
    //middlewares
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    //routes
    routes(app);
    //errorhandlers
    if ('development' === app.get('env')){
        app.use(erroHandler);
    }

    return app;
}
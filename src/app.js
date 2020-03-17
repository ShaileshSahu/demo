const express = require('express');
const utils = require('./util');
const mongoose = require('mongoose');
const route = require('./routes/index');
const http = require('http');

/**
 * This is main server where start your application and which opened your rest api's !!
 */
 class App {
     constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.initDependency();
        this.connectDB();
        this.route();
     }

     // Intiate the dependeny !!
     initDependency() {
         console.log('Dependency has been intiated');
         this.app.use(utils.dependency.cors()); 
         this.app.use(utils.dependency.compression());
         this.app.use(utils.dependency.session({ secret: 'Demo', cookie: { maxAge: 60000 }}));
         this.app.use(utils.dependency.bodyParser.json());
         this.app.use(utils.dependency.bodyParser.urlencoded({extended:true}));
        
     }

     // Connect db
     connectDB() {
        console.log(utils.secret);
        mongoose.connect(utils.secret.MONGO_URI, {
            auth: {
                user: utils.secret.MONGODB_USER,
                password: utils.secret.MONGODB_PASSWORD
            }
        }).then(
            () => {
                console.log('Connected to the database');
            },
        ).catch(err => {
            console.log('server',err);
            console.log('Error in connecting to the database');
            process.exit();
        });
     }

     // Router REST API's
     route() {
        this.app.use(function (req,res,next) {
            console.log('Request time -------> ', Date.now());
            res.locals.startTime = Date.now();
            next();
        });
        this.app.use(route.mainRoute.path, route.mainRoute.router);
     }

     
 }
 
 // start the server and listen the port !!
 new App().server.listen(utils.secret.PORT, () => {
     console.log(
         'server started at', utils.secret.PORT
     )
 });
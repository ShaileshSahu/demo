const express = require('express');
const note = require('./notes.route');

/**
 * Main router handler where we handle the router part of the system !!
 */
class Router {
    
    constructor() {
        this.path = '/api';
        this.router = express.Router();
        this.init();
    }

    // Initalize all the router in the system !!
    init() { 
        this.router.use(note.noteRoute.path, note.noteRoute.router);
    }
}

exports.mainRoute = new Router();



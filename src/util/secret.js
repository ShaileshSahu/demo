const dotenv = require('dotenv');

const  node = process.env.NODE_ENV;
switch(node) {

    case "prod": {
        dotenv.config({ path: __dirname + "/./../../.env.prod"});
        break;
    }

    case "test": {
        dotenv.config({ path:  __dirname + "/./../../.env.test"});
        break;
    }

    case "dev": {
        dotenv.config( { path: __dirname + "/./../../.env.dev"});
        break
    }

    default : {
        console.log('please provide the enviroment file');
        process.exit(1);
    }
}
console.log('data', process.env['PORT']);

module.exports = {
    PORT: process.env['PORT'],
    MONGO_URI: process.env['MONGODB_URI'],
    MONGODB_USER: process.env['MONGODB_USER'],
    MONGODB_PASSWORD: process.env['MONGODB_PASSWORD']
}
'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');
db.sync({force:true})
  .then(() => {

    // Start the web server
    require('./src/server.js').startup(process.env.PORT);
  });


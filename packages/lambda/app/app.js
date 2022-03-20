
const express = require('express');
const app = express();
const port = 8080;

// Configure the routes
require('./lambda.js')(app);
require('./openscad.js')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// exports.handler =  async function(event, context) {
//     console.log("hello, world");
//     return { status: 200 };
// }
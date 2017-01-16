let express = require('express');
let Promise = require('bluebird');
let parser = require('body-parser');
let morgan = require ('morgan');
let celebController = ('./controllers/celebController');
let inputController = ('./controllers/inputController');
let port = 3000;

// define server
let app = express();

//middleware
app.use(parser.json());
app.use(morgan('dev'));

//serve public files
app.use(express.static(__dirname + '/public'));


//database integration
    //add in mlab mongoDB 

//fire off server

app.listen(port, function() {
    console.log('listening on ' + port);
})




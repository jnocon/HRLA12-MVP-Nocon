let express = require('express');
let Promise = require('bluebird');
let parser = require('body-parser');
let morgan = require ('morgan');
let celebController = require('./server/controllers/celebController');
let inputController = require('./server/controllers/inputController');
let mongoose = require('mongoose');
let port = 3000;

// define server
let app = express();

//middleware
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//serve public files
app.use(express.static(__dirname + '/public'));

//database integration
mongoose.connect('mongodb://jesse:1234@ds111489.mlab.com:11489/tester')
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected to Mlab DB');
})

//router

app.get('/', function(req, res){
    res.render('index');
});

app.post('/api/input', inputController.addInput);

app.post('/api/createCeleb', celebController.addCeleb);

app.post('/api/getCeleb', celebController.getCeleb);


//fire off server

app.listen(port, function() {
    console.log('listening on ' + port);
})




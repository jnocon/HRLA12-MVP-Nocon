let request = require('request-promise');
let Celeb = require('../models/celebModel');
let Input = require('../models/inputModel');

celebController = {};

celebController.addCeleb = function(req, res) {
    console.log('hi in celeb controller post');
    
    var n =  req.body.name;
    var ph = req.body.phrase;
    var pic = req.body.picture;
    var obit = req.body.obituary;
    

     Celeb.create({
         name: n,
         phrase: ph,
         obituary: obit,
         picture: pic
     })
     .then(function(resp){
         console.log("Celeb added to database ", resp);
         res.status(201).send(resp);
     })
     
};

celebController.getCeleb = function(req, res) {
    var input = req.body.input;

    if (input === "hi mom") {
        console.log('hi mom')
    } else {
        var n = "Anton Yelchin"
    }

    Celeb.findOne({name: n})
    .then(function(resp) {
        res.status(201).send(resp)
    })
}

module.exports = celebController;
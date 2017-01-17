let request = require('request-promise');
let Celeb = require('../models/celebModel');
let Input = require('../models/inputModel');


inputController = {};

inputController.addInput = function(req, res) {
    var n = req.body.name;
    var inp = req.body.input;

    Input.create({name: n,
                input: inp})
                .then(function(resp){
                    console.log("Input added to database ", resp);
                    res.status(201).send(resp)
                })

};

module.exports = inputController;
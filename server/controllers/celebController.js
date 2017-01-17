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

    var options = {
        uri: "https://www.googleapis.com/youtube/v3/search",
        qs: {
            key: "AIzaSyB9xax9M1uG-5DSdlJbh6ZOzLvGlKtCFNY",
            q: "Anton Yelchin memorial",
            type: 'video',
            videoEmbeddable: "true",
            part: 'snippet',
            maxResults: 1
        }
    };

    request(options)
    .then( function (resp) {

        var response = JSON.parse(resp);
        var link = "https://www.youtube.com/embed/" + response.items[0].id.videoId;
        Celeb.findOne({name: n})
        .then(function(resp) {
        var response = {};
        response.resp = resp;
        response.url = link;
        res.status(201).send(response)
        })
    })
    .catch(function(err){
        console.log("error in request ", err);
    })
}

module.exports = celebController;
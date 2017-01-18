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
    var n = ''
    var nArr = ["Anton Yelchin", "Carrie Fisher", "Debbie Reynolds", "Phife Dawg", "Prince", "Fidel Castro", "David Bowie", "Gene Wilder", "Jose Fernandez", "Alan Thicke" ];

    if (input.includes('car') || input.includes('fence') || input.includes('crushed')  ) {
        n = "Anton Yelchin"
    } else if (input.includes('car') || input.includes('heart') || input.includes('star wars')) {
         n = "Carrie Fisher"
    } else if (input.includes('daughter') || input.includes('mom') || input.includes('christmas')) {
         n = "Debbie Reynolds"
    } else if (input.includes('sugar') || input.includes('tribe') || input.includes('diabetes')) {
         n = "Phife Dawg"
    } else if (input.includes('drugs') || input.includes('legend') || input.includes('purple rain')) {
         n = "Prince"
    } else if (input.includes('cuba') || input.includes('dictator') || input.includes('russia')) {
         n = "Fidel Castro"
    } else if (input.includes('sick') || input.includes('cancer') || input.includes('hospital')) {
         n = "David Bowie"
    } else if (input.includes('forget') || input.includes('memory') || input.includes('family')) {
         n = "Gene Wilder"
    } else if (input.includes('drunk') || input.includes('drink') || input.includes('water')) {
         n = "Jose Fernandez"
    } else if (input.includes('son') || input.includes('father') || input.includes('young')) {
         n = "Alan Thicke"
    } else {
        var i = Math.floor((Math.random() * 9))
        console.log(i = i);
        n = nArr[i];

    }

    var q = n + "memoriam";
    if (n === 'Phife Dawg') {
        q = n + "memorial";
    }



    var options = {
        uri: "https://www.googleapis.com/youtube/v3/search",
        qs: {
            key: "AIzaSyB9xax9M1uG-5DSdlJbh6ZOzLvGlKtCFNY",
            q: q,
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
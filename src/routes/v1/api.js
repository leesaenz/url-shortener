//Including the shorten component so we can shorten URLs.
const shorten = require('../../components/shorten.js');
//Including mongoose
const mongoose = require('mongoose');

module.exports = function(express) {

  var router = express.Router();

  //Specifying routes
  //Main index route of /api/ in the application
  router.get('/', function(req,res) {
    res.status(200); //All good!
    res.json({Status: 200});
  });

  //Setting routes for the url api
  router.route('/urls')
  //First getting all of the URL entries
  .get(function(req,res,next) {
    mongoose.model('Url').find({}, function(err,urls) {
      if(err) {
        return console.error(err);
      } else {
        res.json({
          "urls":urls
        })
      }
    });
  })

  //Next, creating a new URL
  .post(function(req,res) {

    //Gets the long URL and short URL (which is nothing right now) from the request body
    var longUrl = req.body.long_url;
    var shortUrl = req.body.short_url;

    //Creating a new Url in the database based on the above variables
    mongoose.model('Url').create({
      longurl: longUrl,
      shorturl: shortUrl
    }, 
      //If the URL was not added, error, if it was added...
      function(err,url) {
        if(err) {
          res.send("URL was not added to the DB due to a problem.");
        } else {
          //Get the DB entry ID
          var id = url._id;
          //Strip all of the letters out of it
          var id = id.toString().replace(/\D/g,'');
          //Make sure it's a number type
          var id = Number(id);
          //Run the URL shortener component on it, passing the DB id
          shortURL = shorten.shorten(id);
          //Now, update the DB with the URL's new shortened property
          url.update({
              shorturl:shortURL
          },
            //If there's an error with this, send an error message response
            function(err,urlID) {
              if(err) {
                res.send("Problem");
              } else {
                //Else console log that bad boy
                console.log("Long URL: " + longUrl + "\n" + "Long URL Entry: " + url.longurl + "\n" + "ID: " + url._id + "\n" + "Short URL: " + url.shorturl + "\n" + shortURL);
                res.send("URL added! :)");
              }
          });
        }
    });
  });

  //Now, setting up a route for the API functionality based on the ID parameter
  router.route('/urls/:id')
  //Getting a specific URL entry based on ID
  .get(function(req,res) {
    mongoose.model('Url').findById(req.params.id, function (err, url) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        //Return the blob
        res.json(url);
      }
    });
  })

  //Editing an existing URL based on body request
  .put(function(req,res) {
    var longurl = req.body.longurl;
    var shorturl = req.body.shorturl;

    //Find the document by ID
    mongoose.model('Url').findById(req.id, function (err,url) {
      url.update({
        longurl: longurl,
        shorturl: shorturl
      }, function(err,urlID) {
        if(err) {
          res.send("Could not update.");
        } else {
          res.send("URL udpated!");
        }
      });
    });
  })

  .delete(function(req,res){
    mongoose.model('Url').findById(req.params.id,function (err,url) {
      if(err) {
        return console.error(err);
      } else {
        url.remove(function (err,url) {
          if(err) {
            return console.error(err);
          } else {
            console.log("DELETED ID: " + url._id);
            res.send("Deleted URL! :)");
          }
        });
      }
    });
  });

  return router;
}
const shorten = require('../../components/shorten.js');
const mongoose = require('mongoose');

module.exports = function(express) {

  var router = express.Router();

  //Specifying routes
  router.get('/', function(req,res) {
    res.status(200); //All good!
    res.json({Status: 200});
  });

  router.route('/urls')
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

  .post(function(req,res) {

    var longUrl = req.body.long_url;
    var shortUrl = req.body.short_url;

    mongoose.model('Url').create({
      longurl: longUrl,
      shorturl: shortUrl
    }, 
      function(err,url) {
        if(err) {
          res.send("URL was not added to the DB due to a problem.");
        } else {
          var id = url._id;
          var id = id.toString().replace(/\D/g,'');
          var id = Number(id);
          shortURL = shorten.shorten(id);

          mongoose.model('Url').update({
              shorturl:shortURL
          },
            function(err,urlID) {
              if(err) {
                res.send("Problem");
              } else {
                console.log("Long URL: " + longUrl + "\n" + "Long URL Entry: " + url.longurl + "\n" + "ID: " + url._id + "\n" + "Short URL: " + url.shorturl + "\n" + shortURL);
                res.send("URL added! :)");
                //res.json(url);
              }
          });
        }
    });
  });

  router.route('/urls/:id')
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
const shorten = require('../../components/shorten.js');

module.exports = function(express) {
  var router = express.Router();

  //Specifying routes
  router.get('/', function(req,res) {
    res.status(200); //All good!
    res.json({Status: 200});
  });

  router.get('/url', function(req,res) {
    res.json({Status: 200});
  });

  router.get('/url/:url', function(req,res) {

    var longUrl = req.params.url;
    var shortUrl = '';

    shortUrl = shorten.shorten(longUrl);

    res.json({
      'short_url':'http://ur.l/'+shortUrl,
      'long_url_id':longUrl
    });
  });

  return router;
}
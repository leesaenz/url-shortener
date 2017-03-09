//Including the shorten component so we can shorten URLs.
const shorten = require('../components/shorten.js');
//Including mongoose
const mongoose = require('mongoose');

module.exports = (express) => {

  const router = express.Router();

  router.get('/', (req,res) => {
    console.log('Home of API');
    res.json({
      healthy:true
    })
  });

  router.use('/api/v1/', require('./v1/api.js')(express));

  router.route('/go/:shorturl')
  .get(function(req,res){
     mongoose.model('Url').findOne({'shorturl': req.params.shorturl}, function (err, url) {
      var redirect = url.longurl;
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log("Long URL: " + redirect);
        res.json(redirect);
      }
      //res.redirect(redirect);
    });
  });

  return router;
}
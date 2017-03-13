// Including mongoose
// const mongoose = require('mongoose');
const logger = require('../components/logger.js');
const Url = require('../models/url.js');

module.exports = (express) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    logger.info('Homepage of API Works!');
    res.json({
      healthy: true,
    });
  });

  router.use('/api/v1/', require('./v1/api.js')(express));

  router.route('/go/:shorturl')
  .get((req, res) => {
    const u = { shorturl: req.params.shorturl };
    Url.findOne(u, (err, url) => {
      const redirect = url.longurl;
      if (err) {
        logger.error('GET Error: There was a problem retrieving: ' + err);
      } else {
        logger.info('Long URL: ' + redirect);
        res.json(redirect);
      }
      // res.redirect(redirect);
    });
  });

  return router;
};

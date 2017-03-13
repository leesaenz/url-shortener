// Including the shorten component so we can shorten URLs.
const shorten = require('../../components/shorten.js');
// Including mongoose
const mongoose = require('mongoose');
// Including Logger Tool
const logger = require('../../components/logger.js');
// Including Model for URL
const Url = require('../../models/url.js');

module.exports = (express) => {
  // Loading express router into router variable
  const router = express.Router();

  // Specifying routes
  // Main index route of /api/ in the application
  router.get('/', (req, res) => {
    res.status(200); // All good!
    res.json({ Status: 200 });
  });

  // Setting routes for the url api
  router.route('/urls')
  // First getting all of the URL entries
  .get((req, res) => {
    Url.find({}, (err, urls) => {
      if (err) {
        logger.error(err);
      } else {
        res.json({
          urls,
        });
      }
    });
  })

  // Next, creating a new URL
  .post((req, res) => {
    // Gets the long URL and short URL (which is nothing right now) from the request body
    const longUrl = req.body.long_url;
    const shortUrl = '';
    let shortURL = Number;

    // Creating a new Url in the database based on the above variables
    Url.create({
      longurl: longUrl,
      shorturl: shortUrl,
    },
      // If the URL was not added, error, if it was added...
      (err, url) => {
        if (err) {
          res.send('URL was not added to the DB due to a problem.');
          logger.error('URL was not added to the DB due to a problem.');
        } else {
          // Get the DB entry ID
          const id = url._id;
          // Strip all of the letters out of it
          const newid = id.toString().replace(/\D/g, '');
          // Make sure it's a number type
          const numid = Number(newid);
          // Run the URL shortener component on it, passing the DB id
          shortURL = shorten.shorten(numid);
          // Now, update the DB with the URL's new shortened property
          url.update({
            shorturl: shortURL,
          },
            // If there's an error with this, send an error message response
            (errr) => {
              if (errr) {
                res.send('Could not update the ShortURL during creation!');
                logger.error('Could not update the ShortURL during creation!');
              } else {
                // Else console log that bad boy
                logger.info('Long URL: ' + longUrl + '\n Long URL Entry: ' + url.longurl + '\n ID: ' + url.id + '\n Short URL: ' + url.shorturl + '\n' + shortURL);
                res.send('URL successfully added to Mongo database!');
              }
            });
        }
      });
  });

  // Now, setting up a route for the API functionality based on the ID parameter
  router.route('/urls/:id')
  // Getting a specific URL entry based on ID
  .get((req, res) => {
    Url.findById(req.params.id, (err, url) => {
      if (err) {
        logger.error('GET Error: There was a problem retrieving: ' + err);
      } else {
        res.json(url);
        logger.info('Individual URL successfully returned!');
      }
    });
  })

  // Editing an existing URL based on body request
  .put((req, res) => {
    // Find the document by ID
    Url.findById(req.params.id, (err, url) => {
      // If the body request for longurl exists, then update it
      if (req.body.longurl) {
        const longurl = req.body.longurl;
      } else {
        // If not, then it stays equal to its previous value for update
        const longurl = url.longurl;
      }
      // If the request body for shorturl exists, then update it
      if (req.body.shorturl) {
        const shorturl = req.body.shorturl;
      } else {
        // If not, it's value stays the same as it was
        const shorturl = url.shorturl;
      }
      // Update the DB entry for this particular URL we are working with
      url.update({
        longurl: longurl,
        shorturl: shorturl,
      }, (errr) => {
        if (errr) {
          res.send('Could not update URL in the database because of ' + errr);
        } else {
          res.send('URL successfully udpated in the database!');
        }
      });
    });
  })
  // Now delete the entry based on the ID
  .delete((req, res) => {
    // Find it in the DB
    mongoose.model('Url').findById(req.params.id, (err, url) => {
      if (err) {
        logger.error(err);
        res.send(err);
      } else {
        // Delete it
        url.remove((errrr) => {
          if (err) {
            logger.error(errrr);
            res.send(errrr);
          } else {
            logger.log('DELETED ID: ' + url.id);
            res.send('Deleted URL ' + url.id);
          }
        });
      }
    });
  });

  return router;
};

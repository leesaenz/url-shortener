module.exports = (express) => {
  var mongoose   = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/urls');


  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Mongo connection error'));
  db.once('open', function() {
    console.log('Mongo connected...');
  });

  const router = express.Router();

  router.get('/', (req,res) => {
    console.log('Home of API');
    res.json({
      healthy:true
    })
  });

  router.use('/api/v1/', require('./v1/api.js')(express));

  return router;
}
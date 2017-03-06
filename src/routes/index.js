module.exports = (express) => {

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
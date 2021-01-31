import express from 'express';
const app = express();
const router = express.Router();

router.get('/helloworld', (req, res) => {
  res.status(200).send({ message: 'Hello, world'})
})

app.use((req, res) => {
  res.status(404)
  res.render('error', {
    param: {
      status: 404,
      message: 'not found'
    }
  })
})

module.exports = router;
import express from 'express';
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/helloworld', (req, res) => {
  res.status(200).send({ message: 'hello world' })
});

app.listen(port);
console.log('listening on port' + port);
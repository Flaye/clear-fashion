const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

/* === Request endpoint === */
const MongoRequest = require('./db/index.js');

app.get('/products/search/', (request, response)=>{
  /*let limit = request.query.limit ? request.query.limit : 12;
  let brand = request.query.brand ? request.query.brand : "*";
  let price = request.query.price ? request.query.price : null;
  console.log(limit, brand, price);*/
  MongoRequest.findBySearch(/*limit, brand, price,*/request.query).then((res) => {
    response.send({'product':res});
  });
});

app.get('/products/:id', (request, response)=> {
  MongoRequest.findById(request.params.id).then((res) => {
    response.send({'product':res});
  });
});
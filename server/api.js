//Vercel link : https://server-khaki-seven.vercel.app
//client : https://client-henna-xi.vercel.app/
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
  MongoRequest.find({}).then((res)=>{
    response.send({'allProducts': res});
  })
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

/* === Request endpoint === */
const MongoRequest = require('./db/index.js');
const {request, response} = require("express");

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

app.get('/brands/get_all', (request, response)=>{
  MongoRequest.findAllBrands().then((res) => {
    response.send({'brand':res})
  })
})
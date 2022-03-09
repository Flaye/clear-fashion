'use strict'
/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require('./sources/montlimart.js');
const adresse = require('./sources/adresse.js');
const fs = require('fs');

async function sandbox (eshop = 'https://adresse.paris/583-manteaux-et-blousons') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = eshop.includes('dedicated') ? await dedicatedbrand.scrape(eshop)  : (eshop.includes('montlimart') ? await montlimart.scrape(eshop) : await adresse.scrape(eshop));

    //console.log(products);
    return products;
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

let jsonfile = fs.readFileSync('./products.json');
let currentProducts= JSON.parse(jsonfile);

let prod = sandbox(eshop);
prod.then((val) => {
  console.log("==== Debut prod ====");
  val.forEach(function(element){
    if(element.name != ''){
      currentProducts.push(element);
    }
  });
  createJson(JSON.stringify(currentProducts));
});

async function createJson(currentProducts){
  fs.writeFile('./products.json', currentProducts, err => {
    // error checking
    if(err) throw err;
    console.log("New data added");
});   
}
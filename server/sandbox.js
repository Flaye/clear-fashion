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

    console.log(products);
    return products;
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

let prod = sandbox(eshop);
prod.then((val) => {
  console.log("==== Debut prod ====");
  val.forEach(function(element, idx, val) {
    console.log("elem");
    if(element.name != ''){
      console.log("debut if");
      console.log(typeof(element));
      var jsonval = JSON.stringify(element);
      console.log("jsonval")
      console.log(jsonval);
      if(idx == val.length-1){
        fs.writeFileSync("products.json", jsonval,{flag:'a+'});
      }else{
        fs.writeFileSync("products.json", jsonval+",\n",{flag:'a+'});
      }
    }
    console.log("end elem");
  });
  console.log("end");
});

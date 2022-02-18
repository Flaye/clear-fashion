/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require('./sources/montlimart.js');
const adresse = require('./sources/adresse.js');

async function sandbox (eshop = 'https://adresse.paris/583-manteaux-et-blousons') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = eshop.includes('dedicated') ? await dedicatedbrand.scrape(eshop)  : (eshop.includes('montlimart') ? await montlimart.scrape(eshop) : await adresse.scrape(eshop));

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

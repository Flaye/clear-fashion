/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require('./sources/montlimart.js');

async function sandbox (eshop = 'https://www.montlimart.com/pulls-sweats.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = eshop.includes('dedicated') ? await dedicatedbrand.scrape(eshop)  : (eshop.includes('dedicated') ? await montlimart.scrape(eshop) : await montlimart.scrape(eshop));

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

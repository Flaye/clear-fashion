/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const adresse = require('./sources/adresse.js');
const montlimart = require('./sources/montlimart');
const loom = require('./sites/loom');
const db = require('./db');

async function sandbox () {
  try {
    let products = [];
    console.log("ℹ️ Scrapping dedicatedbrand !")
    let pages = [
      'https://www.dedicatedbrand.com/en/men/basics',
      'https://www.dedicatedbrand.com/en/men/sale'
    ];

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with for...of`);

    // Way 1 with for of: we scrape page by page

    for (let page of pages) {
      console.log(`🕵️‍♀️  scraping ${page}`);

      let results = await dedicatedbrand.scrape(page);

      console.log(`👕 ${results.length} products found`);

      products.push(results);
    }
    console.log("\nℹ️ Scrapping adresse.paris !")

    pages = ["https://adresse.paris/630-toute-la-collection"];

    for(let page of pages)
    {
      console.log(`🕵️‍♀️  scraping ${pages}`);
      
      let results = await adresse.scrape(pages);

      products.push(results);
    }



    console.log("\nℹ️ Scrapping Montlimart !");
    pages = ["https://www.montlimart.com/toute-la-collection.html"];
    for(let page of pages)
    {
      console.log(`🕵️‍♀️  scraping ${pages}`);
      
      let results = await montlimart.scrape(pages);

      products.push(results);
    }

    console.log("\nℹ️ Scrapping loom !");

    pages = [
      'https://www.loom.fr/collections/hauts',
      'https://www.loom.fr/collections/bas'
    ];

    console.log('\n');

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);

    const promises = pages.map(page => loom.scrape(page));
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

    console.log(results);
    console.log(results.flat());

    products.push(results.flat());
    products = products.flat();

    console.log('\n');

    console.log(`👕 ${products.length} total of products found`);

    console.log('\n');

    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log('💽  Find Loom products only');

    const loomOnly = await db.find({'brand': 'loom'});

    console.log(`👕 ${loomOnly.length} total of products found for Loom`);
    //console.log(loomOnly);

    //const allProd = await db.find({});
    console.log(`👕 ${products.length} total of products found for all`)

    db.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();

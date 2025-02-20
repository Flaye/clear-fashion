const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  
  return $('.category-products .products-grid .item')
    .map((i, element) => {
      const brand = "montlimart";
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.price')
          .text()
      );
      const link = $(element)
        .find('.link-wishlist').attr("href");
      const date = $(element)
        .find('.productList-newLabel')
        .text();
      const photo = $(element).find('.product-image a img').attr("src");
      /*const size = $(element)
        .find('.productList-size').toArray().map(x => { return $(x).text();});
        */
      return {brand,name, price, link, date,photo};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

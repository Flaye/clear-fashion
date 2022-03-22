const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  
  return $('.productList-container .productList')
    .map((i, element) => {
      const brand = "dedicatedbrand";
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );
      const link = "https://www.dedicatedbrand.com" + $(element)
        .find('.productList-link')[0].attribs.href;
      
      const date = $(element)
        .find('.productList-newLabel')
        .text();
      const photo = $(element).find('.productList-image img').attr("data-src");
        console.log(photo)
      const size = $(element)
        .find('.productList-size').toArray().map(x => { return $(x).text();});

        return {brand, name, price, link, date, size, photo};
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

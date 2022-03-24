const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data, {'xmlMode': true});

  return $('.product-grid__item')
    .map((i, element) => {
      const link = `https://www.loom.fr${$(element)
        .find('.product-title a')
        .attr('href')}`;
      const photo= $(element)
          .find('.product-grid-image a div .main-image')
          .attr('src');
      console.log(photo)
      return {
        link,
        'brand': 'loom',
        'price': parseInt(
          $(element)
            .find('.money')
            .text()
        ),
        'name': $(element)
          .find('.product-title')
          .text()
          .trim()
          .replace(/\s/g, ' '),
        '_id': uuidv5(link, uuidv5.URL),
        photo
      };
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
const scrape = module.exports.scrape = async url => {
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

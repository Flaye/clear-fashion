// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable





/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
var nb_prod = marketplace.length;
// 2. Log the variable
console.log(nb_prod);

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
function list_brand(){
  let ret = []
  for(let i in marketplace){
      if(!(ret.includes(marketplace[i].brand))){
          ret.push(marketplace[i].brand);
      }
  }
  return ret;
}
var l_brand = list_brand();
// 2. Log the variable
console.log(l_brand);
// 3. Log how many brands we have
console.log(l_brand.length);


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
function compare_price(a,b){
  if(a.price < b.price){
      return -1;
  }else if(a.price > b.price){
      return 1;
  }
  return 0;
}
// 2. Create a variable and assign it the list of products by price from lowest to highest
marketplace.sort(compare_price)
// 3. Log the variable
console.log(marketplace);


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
function compare_date(a,b){
  if(a.date < b.date){
      return -1;
  }else if(a.date > b.date){
      return 1;
  }
  return 0;
}
// 2. Create a variable and assign it the list of products by date from recent to old
marketplace.sort(compare_date)
// 3. Log the variable
console.log(marketplace);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
var filtermarket = marketplace.filter(prod => (prod.price >= 50 && prod.price <= 100));
// 2. Log the list
console.log(filtermarket);

//or
function filter(a,b){
  let ret = []
  for(let i in marketplace){
    if(marketplace[i].price < b && marketplace[i].price>a){ 
      ret.push(marketplace[i]);
    }
  }
  return ret;
}




// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
function average(){
  let val = 0;
  for(let i in marketplace){
      val += marketplace[i].price;
  }
  return val / marketplace.length;
}

// 2. Log the average
console.log(average());




/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
function brands(){
  let dict = {};
  for(let i in marketplace){
      if(marketplace[i].brand in dict){
          dict[marketplace[i].brand].push(marketplace[i]);
      }else{
          dict[marketplace[i].brand] = [marketplace[i]];
      }
  }
  return dict;
}
// 2. Log the variable
var dict_brand = brands();
console.log(dict_brand);
// 3. Log the number of products by brands
for( var i in dict_brand){
  console.log(i)
  console.log(dict_brand[i].length); 
}

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
for(var i in dict_brand){
  dict_brand[i].sort(compare_price).reverse();
}
// 2. Log the sort
console.log(dict_brand);

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
for(var i in dict_brand){
  dict_brand[i].sort(compare_date);
}
// 2. Log the sort
console.log(dict_brand);




/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products
  for(let i in brands_dict){
    brands_dict[i].sort(Compare_prices);
    let len = parseFloat(Object.keys(brands_dict[i]).length);
    len*= 0.9;
    brands_dict[i]['p90'] = brands_dict[i][parseInt(len)]['price'];
  }
  console.log(brands_dict);

/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
function fair_price(){
  for(let i in COTELE_PARIS){
      if(COTELE_PARIS[i].price > 100){
          return false;
      }
  }
  return true;
}
console.log(fair_price())
false;
// // A reasonable price if all the products are less than 100€


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
for(var i in COTELE_PARIS){
  if(COTELE_PARIS[i].uuid == "b56c6d88-749a-5b4c-b571-e5b5c6483131"){
      console.log(COTELE_PARIS[i]);
  }
}


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
for(var i in COTELE_PARIS){
  if(COTELE_PARIS[i].uuid == "b56c6d88-749a-5b4c-b571-e5b5c6483131"){
      delete COTELE_PARIS[i];
  }
}

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
console.log(blueJacket);

console.log(jacket);

// 2. What do you notice?

//jacket contains 'favorite'

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties





/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

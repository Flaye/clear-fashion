// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentBrand = null;
let currentBrandIndex = 0;
let currentShowSize = 12;

let allProducts = [];
let allBrands = [];
let product = [];

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectbrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const btn_recent = document.querySelector('#recently_add');
const btn_good_price = document.querySelector('#reasonable_price');


const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

const setAllProducts = ({prods, brands})=>{
  allProducts = prods;
  allBrands = Array.from(brands);
}

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12, brand = null) => {
  try {
    if(brand == null){
      var response = await fetch(
        `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
        //'https://server-khaki-seven.vercel.app/'
      );
    }else{
      var response = await fetch(
        //'https://server-khaki-seven.vercel.app/'
        `https://clear-fashion-api.vercel.app?page=${page}&size=${size}&brand=${brand}`
      );
    }
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};
/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};
/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;

  let copy_allProducts = [...product];
  copy_allProducts = copy_allProducts.filter((x) => {
    let date = x['released']
    let d1 = new Date(date);
    let current_Date = new Date(Date.now() - 12096e5);
    return d1 >= current_Date;
  });
  nbNewProd.innerHTML = copy_allProducts.length;
};

/**
 * Render brand selector
 * @param {Object} brands
 */
const renderBranding = (brands = allBrands) => {
  var options = Array.from(brands,
    (value, index) => `<option value="${index+1}">${value}</option>`).join('');
  options = ('<option value="0">Aucun</option>') + options;
  selectbrand.innerHTML = options;
  selectbrand.selectedIndex = currentBrandIndex;
}

const render = (products, pagination, brands) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);

  // Add
  renderBranding();
};

/**
 * Declaration of all Listeners
 */

 document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  let brands = new Set();
  let all_prods = (await fetchProducts(1,139))['result'];
  for(let b in all_prods){
    brands.add(all_prods[b]['brand']);
    product.push(all_prods[b]);
  }
  console.log(all_prods);
  setCurrentProducts(products);
  setAllProducts({all_prods, brands});
  render(currentProducts, currentPagination, allBrands);
});

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(1,parseInt(event.target.value), currentBrand);
  currentShowSize = parseInt(event.target.value);
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
 * Select the page to display
 */
selectPage.addEventListener('change', async (event) =>{
  const products = await fetchProducts(parseInt(event.target.value), currentShowSize, currentBrand);
  
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectbrand.addEventListener('change', async(event) =>{
  currentBrandIndex =  event.target.value;
  if(currentBrandIndex != 0){
    currentBrand = allBrands[currentBrandIndex-1];
  }else{
    currentBrand = null;
  }
  const products = await fetchProducts(1,currentShowSize,currentBrand );
  setCurrentProducts(products);
  render(currentProducts, currentPagination, event.target.value);
})

btn_recent.addEventListener('click', async(event)=> {
  let copy_allProducts = [...product];
  copy_allProducts = copy_allProducts.filter((x) => {
    let date = x['released']
    let d1 = new Date(date);
    let current_Date = new Date(Date.now() - 12096e5);
    return d1 >= current_Date;
  });

  renderProducts(copy_allProducts);
});

btn_good_price.addEventListener('click', async(event)=> {
  let copy_allProducts = [...product];
  copy_allProducts = copy_allProducts.filter((x) => {
    return x['price'] <= 50;
  });

  renderProducts(copy_allProducts);
});

selectSort.addEventListener('change', async(event)=> {
  let copy_allProducts = [...product];
  if(event.target.value == 'price-asc' || event.target.value == 'price-desc' ){
    copy_allProducts.sort((a,b) => {
      return a['price'] - b['price'];
    });
    if(event.target.value == 'price-desc'){
      copy_allProducts.reverse();
    }
  }else{
    copy_allProducts.sort((a,b) => {
      return a['release'] - b['release'];
    });
    if(event.target.value == 'date-desc'){
      copy_allProducts.reverse();
    }
  }
  console.log(copy_allProducts);
  renderProducts(copy_allProducts);
});
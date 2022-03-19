'use strict'

let allProducts = [];
let currentProducts = [];
let list_brand = [];
let currentBrand = null;

// current products on the page
let nbPages = 0;
let currentBrandIndex = 0;
let currentShowSize = 12;
let currentPage = 1;

// instantiate the selectors
const sectionProducts = document.querySelector('#products');

const selectPage = document.querySelector('#page-select');
const selectShow = document.querySelector('#show-select');
const selectbrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');

/**
 * Set global values
 */
const InitSetValues = (prods, brand) => {
    allProducts = prods;
    list_brand = brand;
    nbPages = allProducts.length / currentShowSize;
    currentProducts = allProducts.slice(0,12);
}

const Show_currentProducts = () => {
    nbPages = allProducts.length / currentShowSize;
    currentProducts = allProducts.slice((currentPage-1)*currentShowSize,currentShowSize*currentPage);
}

/**
 * Fetch functions
 */

const fetchProducts = async (brand = null) => {
    try {
        if (brand == null){
            var response = await fetch("http://localhost:8092/products/search?");
        }else {
            var response = await fetch(`http://localhost:8092/products/search?brand=${brand}`);
        }
        const body = await response.json();
        return body['product'];
    }catch (error){
        console.log(error);
        return currentProducts;
    }
}

const fetchBrand = async () => {
    try {
        var response = await fetch("http://localhost:8092/brands/get_all")
        const brand = await response.json()
        return brand['brand']
    }catch (error){
        console.log(error);
        return []
    }
}

/**
 * Render functions
 */

const renderProducts = products => {
    const section = document.querySelector('#products');
    /*
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    */
    const template = products
        .map(product => {
            console.log(product.name)
            return `
      <div className="card mb-3" id=${product.uuid}>
        <div className="card-body">
          <a href="${product.link}"><h4 className="card-title">${product.name}</h4></a>
          <h6 className="card-subtitle mb-2 text-muted">${product.brand}</h6>
          <p className="card-text">${product.price}</p>
        </div>
      </div>`;
        })
        .join('');

    /*div.innerHTML = template;
    fragment.appendChild(div);*/
    sectionProducts.innerHTML = '<h2>Products</h2>';
    sectionProducts.innerHTML += template;
    //sectionProducts.appendChild(fragment);
};

const renderBranding = (brands = allBrands) => {
    var options = Array.from(brands,
        (value, index) => `<option value="${index+1}">${value}</option>`).join('');
    options = ('<option value="0">Aucun</option>') + options;
    selectbrand.innerHTML = options;
    selectbrand.selectedIndex = currentBrandIndex;
}

const renderPagination = () => {
    const options = Array.from(
        {'length': nbPages},
        (value, index) => `<option value="${index + 1}">${index + 1}</option>`
    ).join('');

    selectPage.innerHTML = options;
    selectPage.selectedIndex = currentPage - 1;
}

const render = (products, brands = null) => {
    renderProducts(products);
    renderPagination();
    if(brands){
        renderBranding(brands);
    }
}

/**
 * Declaration of all Listeners
 */
document.addEventListener('DOMContentLoaded', async () =>{
    let prod = await fetchProducts();
    let brand = await fetchBrand();

    InitSetValues(prod, brand);
    render(currentProducts, list_brand)
})

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
    currentShowSize = parseInt(event.target.value);
    Show_currentProducts(currentPage, currentShowSize);
    render(currentProducts);
});

/**
 * Select the page to display
 */
selectPage.addEventListener('change', async (event) =>{
    currentPage = parseInt(event.target.value);
    Show_currentProducts(currentPage, currentShowSize);
    render(currentProducts);
});


/**
 * Select the brand to display
 */
selectbrand.addEventListener('change', async(event) =>{
    currentBrandIndex =  event.target.value;
    console.log(currentBrandIndex, list_brand[currentBrandIndex-1])
    if(currentBrandIndex != 0 && currentBrandIndex <= list_brand.length){
        currentBrand = list_brand[currentBrandIndex-1];
    }else{
        currentBrand = null;
    }
    const products = await fetchProducts(currentBrand);
    InitSetValues(products, list_brand);
    render(currentProducts);
});

/**
 * Select the sort
 */
selectSort.addEventListener('change', async(event)=> {
    let copy_allProducts = [...allProducts];
    copy_allProducts.sort((a,b) => {
        return a['price'] - b['price'];
    });
    if(event.target.value == 'price-desc'){
        copy_allProducts.reverse();
    }
    InitSetValues(copy_allProducts, list_brand);
    render(currentProducts);
});
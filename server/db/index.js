require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');

const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = "mongodb+srv://dbUser:dbUser@cluster0.biew1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let client = null;
let database = null;
/**
 * Get db connection
 * @type {MongoClient}

 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}

 */
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    const result = await collection.insertMany(products, {'ordered': false});

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': error.result.nInserted
    };
  }
};

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}

 */
module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};

const logresult = module.exports.logresult = async()=>{
  try{
    const products = require('../products.json');
    const db = await getDB();
    const collection = db.collection('products');
    const result = await collection.insertMany(products);
    console.log(result);
  }catch(err){
    console.log(err);
  }
}

/*
getDB().then(async db => {
    const products = require('../products.json');
    const collection = db.collection('products');
    const result = await collection.insertMany(products);
    console.log(result);
});*/

const findBrand = module.exports.findBrand = async brand => {
  try{
    const query = {brand}
    const res = await this.find(query);
    return res;
    process.exit(0);
  }catch(err){
    console.log("🚨 findBrand",err);
    process.exit(1);
  }
}

const findLessThanPrice = module.exports.findLessThanPrice = async price => {
  try{
    const query = {price: {$lte:price}};
    const res = await this.find(query);
    return res;
    process.exit(0);
  }catch(err){
    console.log("🚨 findLessThanPrice",err);
    process.exit(1);
  }
}

const findSortedPrice = module.exports.findSortedPrice = async (order) => {
  try{
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    var mysort = {price:  order};
    const result = await collection.find().sort(mysort).toArray();
    return result;
  }catch(err){
    console.log("🚨 findSorted",err);
    process.exit(1);
  }
}
/*
findBrand("montlimart").then(brand => {
  console.log(brand);
});
*/

findLessThanPrice(50).then(price => {
  console.log(price);
});

/*
findSortedPrice(1).then(price => {
  console.log(price);
});*/
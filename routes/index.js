var express = require('express');
var router = express.Router();
const products = require('../data/products'); //inport products.js

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Freaky Fasion', products: products });
});

/*Rendaring to BLACK DRESS (/products/black-dress) page.
router.get('/products/black-dress', function(req, res, next) {
  res.render('products/black-dress', { title: 'Black Dress', products: products });
}); */

/*router.get('/products/black-dress', function(req, res, next) {
  res.render('products/black-dress', { title: 'Express' });
});*/

//GET BLACK DRESS page(/products/black-dress) .
//Rout for only displaying Black dress (id:1) product 

// ----SHUFFLE FUNCTION----
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ROUTE for Display to black dress page.
router.get('/products/black-dress', (req, res) => {

  //Display only "ID:1" 
  const product = products.find(p => p.id === 1);

  if (product) {
    // SHUFFLE "products"  
    shuffleArray(products);
    // PICK 3 products from "RAMDOM products"
    const selectedProducts = products.slice(0, 3);

    // Give "product" and "selectedProducts" to ejs templete.
    res.render('products/black-dress', {
      title: 'Black Dress',
      product,
      selectedProducts
    });
  } else {
    res.status(404).send('Product not found');
  }
});






/*Rendaring to PRODUCTS (admin/products) page. */
router.get('/admin/products', function(req, res, next) {
  res.render('admin/products', { title: 'Admin' });
});

/*Rendaring to NEW (admin/products/new) page. */
router.get('/admin/products/new', function(req, res, next) {
  res.render('admin/products/new', { title: 'Ny product' });
});

module.exports = router;

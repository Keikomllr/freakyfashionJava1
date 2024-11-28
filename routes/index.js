var express = require('express');
var router = express.Router();
const products = require('../data/products'); //inport products.js

const Database = require('better-sqlite3');

// データベース接続
const db = new Database('./db/admin.db', { 
  verbose: console.log,
  fileMustExist: true
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Freaky Fasion', products: products });
});


// ----SHUFFLE FUNCTION----
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// TODO: Flytta till routes-mapp details page.
router.get('/products/:urlSlug', (req, res) => {

  const urlSlug = req.params.urlSlug; // get Slug from URL 
  const product = products.find(p => p.urlSlug === urlSlug); //Search the product

  //const row = select.get(urlSlug);
  
  if (product) {
    // SHUFFLE "products"  
    shuffleArray(products);
    // PICK 3 products from "RAMDOM products"
    const selectedProducts = products.slice(0, 3);

    // Give "product" and "selectedProducts" to ejs templete.
    res.render('products/details', {
      title: 'Products Details',
      product,
      selectedProducts
    });
  } else {
    res.status(404).send('Product not found');
  }
});




//--------ADMIN------------

// JSONを返すエンドポイント
// Web API endpoint för att hämta ut fordon som JSON
// GET /api/vehicles
router.get('/admin/api/products', function(req, res) {

  // Förbered anrop mot db
  const select = db.prepare(`
      SELECT  namn, 
              sku, 
              pris
      FROM    newProducts
  `);

  // Gör anrop mot db - rows kommer vara en array.
  // Arrayn är tom om det inte finns några rader, annars
  // innehåller den objekt där varje objekt representerar
  // en rad i tabellen.
  const rows = select.all();

  // Konvererat arrayn (objekt) som skickas in, till en JSON-sträng
  res.json(rows); // JSONを返す
});



// HTMLを返すエンドポイント
router.get('/admin/products', function(req, res) {
  res.render('admin/products', { title: 'Produkter' }); // HTMLを返す
});



//---ADMIN/PRODUCTS/NEW----

// `/admin/products/new` 新商品の追加フォーム表示
router.get('/admin/products/new', function(req, res) {

  //Returnara HTML
  res.render('admin/products/new', { title: 'Ny produkt' });
});

// POST `/admin/products/new` 新商品の追加処理
router.post('/admin/products/new', function(req, res)  {
  try {
    // Komma åt informationen som skickades till backend
  
    // FRÅGA: Hur kan jag komma åt informationen som skickats från 
    // frontend?
    // Content-Type: application/x-www-form-urlencoded
    // name=dress&sku=xxx11&pris=199

    // Content-Type: application/json
    // {"namn":"dress","sku":"xxx11","pris:"199"} 

    

    // フォームデータをデータベースに保存
    const newProduct = {
      namn: req.body.namn,
      d_message: req.body.d_message,
      photo: req.body.photo,
      sku: req.body.sku,
      pris: req.body.pris,
    };

    // Via egenskapen "body" på request-objektet (req)
    const insert = db.prepare(`
      INSERT INTO newProducts (
      namn, 
      d_message, 
      photo, 
      sku, 
      pris
      ) VALUES (
       @namn, 
       @d_message, 
       @photo, 
       @sku, 
       @pris
       )
    `);

    // Kör SQL
    insert.run(newProduct);

    //console.log('Added a new product:', result);

    res.redirect('/admin/products'); // リストページにリダイレクト
  
  
  } catch (error) {
    console.error('エラー:', error.message);
    res.status(500).send('商品追加中にエラーが発生しました');
  }
});



module.exports = router;

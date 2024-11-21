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


// `/admin/products` 商品一覧表示
router.get('/admin/products', (req, res) => {
  try {
    const select = db.prepare(`
      SELECT id, namn, d_message, photo, sku, amount
      FROM posts
    `);
    const newProducts = select.all(); // 全商品のデータを取得
    res.render('admin/products', { title: 'produkter', newProducts });
  } catch (error) {
    console.error('エラー:', error.message);
    res.status(500).send('商品一覧の取得中にエラーが発生しました');
  }
});

// `/admin/products/new` 新商品の追加フォーム表示
router.get('/admin/products/new', (req, res) => {
  res.render('admin/products/new', { title: 'Ny produkt' });
});

// `/admin/products/new` 新商品の追加処理
router.post('/admin/products/new', (req, res) => {
  try {
    const insert = db.prepare(`
      INSERT INTO posts (namn, d_message, photo, sku, amount)
      VALUES (@namn, @d_message, @photo, @sku, @amount)
    `);

    // フォームデータをデータベースに保存
    const result = insert.run({
      namn: req.body.namn,
      d_message: req.body.d_message,
      photo: req.body.photo,
      sku: req.body.sku,
      amount: req.body.amount,
    });

    console.log('Added a new product:', result);
    res.redirect('/admin/products'); // リストページにリダイレクト
  } catch (error) {
    console.error('エラー:', error.message);
    res.status(500).send('商品追加中にエラーが発生しました');
  }
});


/*Rendaring to PRODUCTS (admin/products) page. 
router.get('/admin/products', function(req, res, next) {
 */  
   /*try { 
    // TODO: Lägg till ny product
    const select = db.prepare(`
      SELECT id,
             namn,
             d_message,
             photo,
             sku,
             amount  
        FROM posts
    `);
  
    // Kör SQL SELECT
    const rows = select.all();
    //res.json(rows); // JSON形式で返す
  
    res.render('admin/products', { 
      title: 'Ny product',
      posts: rows 
    });

  } catch (error) {
    console.error('データベースエラー:', error.message);
    res.status(500).send('内部エラーが発生しました');
  }
}); 
*/



/*Rendaring to NEW (admin/products/new) page. 
router.get('/admin/products/new', function(req, res, next) {
  
  res.render('admin/products/new', {title: 'Admin' });
});
*/


module.exports = router;

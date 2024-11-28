DROP TABLE newProducts;

CREATE TABLE newProducts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  namn TEXT,
  d_message TEXT,
  photo TEXT,
  sku TEXT,
  pris TEXT
);

INSERT INTO newProducts (
  namn,
  d_message,
  photo,
  sku,
  pris
  )VALUES (
    'Svart T-shirt',
     'Classic svart T-shirt', 
     'https://placehold.co/400x580?text=Black+T-shirt', 'AAA111', 
     '199'
     );
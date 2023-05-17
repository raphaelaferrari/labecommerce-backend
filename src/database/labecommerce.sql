-- Active: 1683740150892@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT NOT NULL
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(purchase_id) REFERENCES purchases(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);

INSERT INTO users (id, name, email, password, createdAt)
VALUES
("001","Fulano","fulano@gmail.com","111111","2023-04-23 21:39:48"),
("002","Ciclano","ciclano@gmail.com","222222","2023-04-23 21:39:48");

INSERT INTO products (id, name, price, description, imageUrl)
VALUES
("p001","Cropped",20.50,"100% algodão","https://moda20.com.br/wp-content/uploads/2020/02/f5f1d384ac5e5ee959d0168ec0205998.jpg"),
("p002","Calça da Nike",15.50,"Calça da Nike preta, com detalhes em vermelho, 80% algodão0","https://th.bing.com/th/id/OIP.JOo0TGs_YUeJS5UkhrTigQHaHa?pid=ImgDet&rs=1");

INSERT INTO purchases(id, paid, buyer)
VALUES
("pu001", "1", "001"),
("pu002", "1", "002");

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
("pu002", "p002", 2),
("pu001", "p002", 3);

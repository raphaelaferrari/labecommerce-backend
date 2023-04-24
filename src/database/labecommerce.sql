
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

INSERT INTO users (id, name, email, password, createdAt)
VALUES
("001","Fulano","fulano@gmail.com","111111","2023-04-23 21:39:48"),
("002","Ciclano","ciclano@gmail.com","222222","2023-04-23 21:39:48");

INSERT INTO products (id, name, price, description, imageUrl)
VALUES
("p001","Cropped",20.50,"100% algodão","https://moda20.com.br/wp-content/uploads/2020/02/f5f1d384ac5e5ee959d0168ec0205998.jpg"),
("p002","Calça da Nike",15.50,"Calça da Nike preta, com detalhes em vermelho, 80% algodão0","https://th.bing.com/th/id/OIP.JOo0TGs_YUeJS5UkhrTigQHaHa?pid=ImgDet&rs=1");
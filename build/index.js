"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get("/users", (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        res.status(400);
    }
});
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        res.status(400);
    }
});
app.get("/product/search", (req, res) => {
    try {
        const q = req.query.q;
        if (q.length < 1) {
            res.status(400);
            throw new Error("Query params deve possuir pelo menos um caractere");
        }
        const result = database_1.products.filter(product => product.name.toUpperCase().includes(q.toUpperCase()));
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
const tempo = new Date().getTime();
console.log(tempo);
app.post('/users', (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        database_1.users.filter(user => {
            if (user.id === id) {
                res.status(409);
                throw new Error("Já existe usúario com esse 'id'");
            }
        });
        database_1.users.filter(user => {
            if (user.email === email) {
                res.status(409);
                throw new Error("Já existe usúario com esse email");
            }
        });
        if (!id) {
            res.status(401);
            throw new Error("Não é possivel criar um usúario sem id");
        }
        if (!email) {
            res.status(401);
            throw new Error("Não é possivel criar um usúario sem email");
        }
        if (!password) {
            res.status(401);
            throw new Error("Não é possivel criar um usúario sem senha");
        }
        if (id !== undefined) {
            if (id.length <= 2) {
                res.status(401);
                throw new Error("'id' deve conter mais de 2 caractere");
            }
        }
        if (email !== undefined) {
            if (email.length <= 10) {
                res.status(401);
                throw new Error("'email' deve conter mais de 10 caractere");
            }
            if (!email.includes("@")) {
                res.status(401);
                throw new Error("'email' inválido");
            }
        }
        if (password !== undefined) {
            if (password.length <= 5) {
                res.status(401);
                throw new Error("senha muito curta, deve conter mais de 5 caractere");
            }
        }
        const newUser = {
            id,
            email,
            password
        };
        database_1.users.push(newUser);
        res.status(201).send(tempo);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/products', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const newProduct = {
        id,
        name,
        price,
        category
    };
    database_1.products.push(newProduct);
    res.status(201).send("Cadastrado com sucesso!");
});
app.post('/purchases', (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    database_1.purchases.push(newPurchase);
    res.status(201).send("Cadastrado com sucesso!");
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.products.filter((product) => {
        if (product.id === id) {
            return "encontrado";
        }
    });
    res.status(200).send(result);
});
app.get("/users/:id/purchases", (req, res) => {
    const id = req.params.id;
    const result = database_1.purchases.filter(purchase => purchase.userId.toUpperCase().includes(id.toUpperCase()));
    res.status(200).send(result);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const resultIndex = database_1.users.findIndex(user => user.id === id);
    if (resultIndex >= 0) {
        database_1.users.splice(resultIndex, 1);
    }
    res.status(200).send("User apagado com sucesso");
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const resultIndex = database_1.products.findIndex(product => product.id === id);
    if (resultIndex >= 0) {
        database_1.products.splice(resultIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
});
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const user = database_1.users.find(user => user.id === id);
    if (user) {
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;
    }
    res.status(200).send("Cadastro atualizado com sucesso");
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const product = database_1.products.find(product => product.id === id);
    if (product) {
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.category = newCategory || product.category;
    }
    res.status(200).send("Produto atualizado com sucesso");
});
//# sourceMappingURL=index.js.map
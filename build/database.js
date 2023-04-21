"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "001",
        email: "user1@gmail.com",
        password: "111111"
    },
    {
        id: "002",
        email: "user2@gmail.com",
        password: "222222"
    }
];
exports.products = [
    {
        id: "p001",
        name: "camisa preta da Nike",
        price: 20.50,
        category: types_1.categoryProduct.BLUSA
    },
    {
        id: "p002",
        name: "camisa branca simples",
        price: 15.50,
        category: types_1.categoryProduct.BLUSA
    }
];
exports.purchases = [
    {
        userId: "001",
        productId: "p001",
        quantity: 1,
        totalPrice: 20.50
    },
    {
        userId: "002",
        productId: "p001",
        quantity: 2,
        totalPrice: 20.50
    },
];
function createUser(id, email, password) {
    exports.users.push({ id: id,
        email: email,
        password: password });
    return "Cadastro realizado com sucesso";
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users.map(users => { return users; });
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({
        id: id,
        name: name,
        price: price,
        category: category
    });
    return "Produto criado com sucesso";
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products.map(products => { return products; });
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    return exports.products.filter((product) => {
        if (product.id === idToSearch) {
            return "encontrado";
        }
    });
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.products.filter((product) => {
        return product.name.toUpperCase().includes(q.toUpperCase());
    });
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.purchases.push({
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    });
    return "compra realizada com sucesso";
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return exports.purchases.filter((purchase) => {
        if (purchase.userId === userIdToSearch) {
            return purchase;
        }
    });
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
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
        category: "roupas"
    },
    {
        id: "p002",
        name: "camisa branca simples",
        price: 15.50,
        category: "roupas"
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
//# sourceMappingURL=database.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
console.log("Criando o index.ts");
console.log((0, database_1.createUser)("004", "user4@gmail.com", "444444"));
console.log((0, database_1.getAllUsers)());
console.log((0, database_1.createProduct)("p004", "Calça da Nike", 40.59, types_1.categoryProduct.CALCA));
console.log((0, database_1.getAllProducts)());
console.log((0, database_1.getProductById)("p007"));
console.log((0, database_1.queryProductsByName)("camisa"));
console.log((0, database_1.createPurchase)("001", "p002", 1, 41.00));
console.log((0, database_1.getAllPurchasesFromUserId)("001"));
//# sourceMappingURL=index.js.map
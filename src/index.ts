import {createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId} from "./database";
import { categoryProduct } from "./types";

console.log("Criando o index.ts");

// console.log(users);
// console.log(products);
// console.log(purchases);

console.log(createUser("004",  "user4@gmail.com", "444444"));
console.log(getAllUsers())
console.log(createProduct("p004", "Calça da Nike", 40.59, categoryProduct.CALCA));
console.log(getAllProducts());
console.log(getProductById("p007"));
console.log(queryProductsByName("camisa"));
console.log(createPurchase("001", "p002", 1, 41.00));
console.log(getAllPurchasesFromUserId("001"));

import { product, purchase, user } from "./types"

export const users: user[] = [
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
]

export const products: product[] =[
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
]  

export const purchases: purchase[] =[
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
]
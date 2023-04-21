import { categoryProduct, product, purchase, user } from "./types"

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
        category: categoryProduct.BLUSA
    },
    {
        id: "p002",
        name: "camisa branca simples",
        price: 15.50,
        category: categoryProduct.BLUSA
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

export function createUser(id: string, email : string,password: string ) {

    users.push(
        {id: id,
        email: email,
        password: password}
    )

    return "Cadastro realizado com sucesso"
}

export function getAllUsers () {
    
    return users.map(users => {return users})
}

export function createProduct (id: string, name: string, price: number, category: categoryProduct) {
    products.push(
        {
        id: id,
        name: name,
        price: price,
        category: category
        }
    )

    return "Produto criado com sucesso"
}

export function getAllProducts () {
    
    return products.map(products => {return products})
}

export function getProductById ( idToSearch: string) {
    return products.filter((product) => { 
        if (product.id === idToSearch) {
            return "encontrado"
        }
    })
}

export function queryProductsByName ( q: string) {
    return products.filter((product) => {
    
        return product.name.toUpperCase().includes(q.toUpperCase())
    })
}

export function createPurchase (userId: string, productId: string, quantity: number,totalPrice: number) {
    purchases.push({
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    })

    return "compra realizada com sucesso"
}

export function getAllPurchasesFromUserId (userIdToSearch: string) {
   return purchases.filter((purchase) => {
    if (purchase.userId === userIdToSearch) {
        return purchase
    }
   }) 
}
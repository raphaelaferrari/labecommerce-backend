// É a pessoa cliente cadastrada.

export type user = {
    id: string,
    email: string,
    password: string
}

// É o produto cadastrado.
export type product = {
    id: string,
    name: string,
    price: number,
    category: string
}

// É a compra realizada por cliente.
export type purchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}
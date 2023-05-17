// É a pessoa cliente cadastrada.

export type user = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string
}

// É o produto cadastrado.
export type product = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

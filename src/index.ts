import {createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId, users, products, purchases} from "./database";
import { categoryProduct, product, purchase, user } from "./types";

import express, { Request, Response } from 'express'
import cors from 'cors'

// console.log("Criando o index.ts");
// console.log(createUser("004",  "user4@gmail.com", "444444"));
// console.log(getAllUsers())
// console.log(createProduct("p004", "Calça da Nike", 40.59, categoryProduct.CALCA));
// console.log(getAllProducts());
// console.log(getProductById("p007"));
// console.log(queryProductsByName("camisa"));
// console.log(createPurchase("001", "p002", 1, 41.00));
// console.log(getAllPurchasesFromUserId("001"));

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/product/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter(product => product.name.toUpperCase().includes(q.toUpperCase())
    )
    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response) => {
    
    const id = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    const newUser: user = {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("Cadastrado com sucesso!")
});

app.post('/products', (req: Request, res: Response) => {
    
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const category = req.body.category as categoryProduct;

    const newProduct: product = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("Cadastrado com sucesso!")
});

app.post('/purchases', (req: Request, res: Response) => {
    
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
    const totalPrice = req.body.totalPrice as number;

    const newPurchase: purchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send("Cadastrado com sucesso!")
})

app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = products.filter((product) => { 
        if (product.id === id) {
            return "encontrado"
        }
    })

    res.status(200).send(result);
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const id = req.params.id as string;

    const result = purchases.filter(purchase => purchase.userId.toUpperCase().includes(id.toUpperCase()))

    res.status(200).send(result);
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id as string;

    const resultIndex = users.findIndex(user => user.id === id)

    if (resultIndex >= 0) {
        users.splice(resultIndex, 1)
    }

    res.status(200).send("User apagado com sucesso")
})

app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id as string;

    const resultIndex = products.findIndex(product => product.id === id)

    if (resultIndex >= 0) {
        products.splice(resultIndex, 1)
    }

    res.status(200).send("Produto apagado com sucesso")
})

app.put("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id as string

    const newEmail = req.body.email as string | undefined
    const newPassword =  req.body.password as string | undefined

    const user = users.find(user => user.id === id)

    if (user) {
        user.email = newEmail || user.email
        user.password =  newPassword || user.password
    }

    res.status(200).send("Cadastro atualizado com sucesso")
})

app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id as string

    const newName = req.body.name as string | undefined
    const newPrice =  req.body.price as number | undefined
    const newCategory =  req.body.category as categoryProduct | undefined

    const product = products.find(product => product.id === id)

    if (product) {
        product.name = newName || product.name
        product.price =  newPrice || product.price
        product.category =  newCategory || product.category
    }

    res.status(200).send("Produto atualizado com sucesso")
})
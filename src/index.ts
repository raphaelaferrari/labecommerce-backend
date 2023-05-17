import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from "./database/knex";
import { user } from './types';

const app = express()

app.use(express.json())
app.use(cors())


app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001")
})

app.get("/users", async (req: Request, res: Response) => {
    try {
        const result: user[] = await db("users")

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get("/product/search", async (req: Request, res: Response) => {

    try {
        const q = req.query.q as string


        if (q.length < 1) {
            res.status(400)
            throw new Error("Query params deve possuir pelo menos um caractere")
        }

        const result = await db.raw(`
            
            SELECT * FROM products
            WHERE name LIKE "${q}%";
        `);


        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post('/users', async (req: Request, res: Response) => {
    try {

        const date = new Date()
        const dia = String(date.getDate()).padStart(2, "0")
        const mes = String(date.getMonth() + 1).padStart(2, "0")
        const ano = date.getFullYear()
        const hora = String(date.getHours()).padStart(2, "0")
        const min = String(date.getMinutes()).padStart(2, "0")
        const sec = String(date.getSeconds()).padStart(2, "0")
        const infoAt = `${ano}-${mes}-${dia} ${hora}:${min}:${sec}`

        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const createdAt = infoAt

        if (!id) {
            res.status(401)
            throw new Error("Não é possivel criar um usúario sem id")
        }

        if (!name) {
            res.status(401)
            throw new Error("Não é possivel criar um usúario sem name")
        }

        if (!email) {
            res.status(401)
            throw new Error("Não é possivel criar um usúario sem email")
        }

        if (!password) {
            res.status(401)
            throw new Error("Não é possivel criar um usúario sem senha")
        }


        if (id !== undefined) {
            if (id.length <= 2) {
                res.status(401)
                throw new Error("'id' deve conter mais de 2 caractere")
            }
        }

        if (name !== undefined) {
            if (name.length <= 2) {
                res.status(401)
                throw new Error("'name' deve conter mais de 2 caractere")
            }
        }

        if (email !== undefined) {
            if (email.length <= 10) {
                res.status(401)
                throw new Error("'email' deve conter mais de 10 caractere")
            }
            if (!email.includes("@")) {
                res.status(401)
                throw new Error("'email' inválido")
            }
        }

        if (password !== undefined) {
            if (password.length <= 5) {
                res.status(401)
                throw new Error("Senha muito curta, deve conter mais de 5 caractere")
            }
        }

        const newUser = {
            id,
            name,
            email,
            password,
            createdAt
        }

        await db("users").insert(newUser)


        res.status(201).send("Cadastrado com sucesso")

    } catch (error) {

        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

});

app.post('/products', async (req: Request, res: Response) => {

    try {
        const id = req.body.id as string;
        const name = req.body.name as string;
        const price = req.body.price as number;
        const description = req.body.description as string;
        const imageUrl = req.body.imageUrl as string

        if (!id) {
            res.status(401)
            throw new Error("Não é possivel criar um produto sem id")
        }

        if (!name) {
            res.status(401)
            throw new Error("Não é possivel criar um produto sem name")
        }

        if (!price) {
            res.status(401)
            throw new Error("Não é possivel criar um produto sem price")
        }

        if (!description) {
            res.status(401)
            throw new Error("Não é possivel criar um produto sem description")
        }

        if (!imageUrl) {
            res.status(401)
            throw new Error("Não é possivel criar um produto sem imageUrl")
        }

        if (id !== undefined) {
            if (id.length <= 3) {
                res.status(401)
                throw new Error("'id' deve conter mais de 3 caractere")
            }
        }

        if (name !== undefined) {
            if (name.length <= 2) {
                res.status(401)
                throw new Error("'name' deve conter mais de 2 caractere")
            }
        }

        if (price !== undefined) {
            if (price < 10) {
                res.status(401)
                throw new Error("Não é possivel cadastrar produtos abaixo de R$10,00")
            }
        }

        if (description !== undefined) {
            if (description.length <= 10) {
                res.status(401)
                throw new Error("Descrição muito curta")
            }
        }

        if (imageUrl !== undefined) {
            if (!imageUrl.includes("https://")) {
                res.status(401)
                throw new Error("Sua 'imagemUrl' deve conter https://")
            }
        }

        const newProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        }

        await db("products").insert(newProduct)

        res.status(201).send("Cadastrado com sucesso!")
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

});

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string;
        const paid = req.body.paid as string
        const buyer = req.body.buyer as string
        const purchase_id = req.body.purchase_id as string
        const product_id = req.body.product_id as string
        const quantity = req.body.quantity as number

        if (!id) {
            res.status(401)
            throw new Error("Não é possivel criar o purchases sem um id")
        }
        if (!paid) {
            res.status(401)
            throw new Error("Não é possivel criar o purchases sem um paid, insira 0 para false e 1 para true")
        }
        if (!buyer) {
            res.status(401)
            throw new Error("Não é possivel criar o purchases sem inserir o buyer")
        }
        if (!purchase_id) {
            res.status(401)
            throw new Error("Não é possivel criar o purchases sem inserir o purchase_id")
        }
        if (!product_id) {
            res.status(401)
            throw new Error("Não é possivel criar o purchases sem inserir o product_id")
        }
        if (!quantity) {
            res.status(401)
            throw new Error("Não é possivel criar o purchases sem inserir o quantity")
        }


        if (id !== undefined) {
            if (id.length <= 3) {
                res.status(401)
                throw new Error("'id' deve conter mais de 3 caractere")
            }
        }

        const searchUsers = await db.raw(`
            
            SELECT * FROM users
            WHERE id = "${buyer}";
        `);

        if (searchUsers.length === 0) {
            res.status(404)
            throw new Error("buyer não encontrado, insira um buyer válido")
        }

        const searchProducts = await db.raw(`
            
            SELECT * FROM products
            WHERE id = "${product_id}";
        `);

        if (searchProducts.length === 0) {
            res.status(404)
            throw new Error("product_id não encontrado, insira um product_id válido")
        }

        if (id !== purchase_id) {
            res.status(401)
            throw new Error("purchase_id é diferente de id, insira o purchase_id corretamente")
        }

        if (quantity <= 0) {
            res.status(401)
            throw new Error("não é possivel por um quantity igual ou menor que 0, insira uma quantity válida")
        }

        const newPurchases = {
            id,
            paid,
            buyer
        }

        const newPurchasesProducts = {
            purchase_id,
            product_id,
            quantity
        }

        await db("purchases").insert(newPurchases)
        await db("purchases_products").insert(newPurchasesProducts)

        res.status(201).send("Cadastrado com sucesso!")
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.get("/products/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id as string

        const result = await db.raw(`
            SELECT * FROM products
            WHERE id LIKE "${id}"
        `)

        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(401)
            throw new Error("Produto não encontrado")
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {

        const id = req.params.id as string

        const searchPurchases = await db.raw(`
            SELECT price, quantity FROM purchases_products
            INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
            INNER JOIN products ON purchases_products.product_id = products.id
            WHERE purchase_id LIKE "${id}";
        `)


        if (searchPurchases.length > 0) {

            const [purchase] = await db.raw(`
            SELECT price, quantity FROM purchases_products
            INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
            INNER JOIN products ON purchases_products.product_id = products.id
            WHERE purchase_id LIKE "${id}";
            `)

            await db.raw(`
                UPDATE purchases
                SET
                total_price = ${purchase.quantity * purchase.price}
                WHERE id = "${id}"
            `)

            const result = await db.raw(`
                SELECT 
                    purchase_id AS purchaseId, 
                    buyer AS buyerId, 
                    users.name AS buyerName,
                    email AS buyerEmail,
                    total_price AS totalPrice,
                    purchases.created_at AS createdAt,
                    paid,
                    products.id,
                    products.name,
                    price,
                    description,
                    imageUrl,
                    quantity
                FROM purchases_products
                INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
                INNER JOIN products ON purchases_products.product_id = products.id
                INNER JOIN users ON purchases.buyer = users.id
                WHERE purchase_id LIKE "${id}";
            `)
            res.status(200).send(result);
        } else {
            res.status(401)
            throw new Error("Produto não encontrado")
        }

    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.delete("/users/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id as string;

        const [user] = await db("users").where({
            id: id
        })

        if (user) {
            await db("users").delete().where({
                id: id
            })
        } else {
            res.status(404)
            throw new Error("User não encontrada");
        }

        res.status(200).send("User apagado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        const [product] = await db("products").where({
            id: id
        })

        if (product) {
            await db("products").delete().where({
                id: id
            })
        } else {
            res.status(404)
            throw new Error("Produto não encontrada");
        }

        res.status(200).send("Produto apagado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const [purchase] = await db("purchases_products").where({
            purchase_id: id
        })

        if (purchase) {
            await db("purchases_products").delete().where({
                purchase_id: id
            })
            await db("purchases").delete().where({
                id: id
            })
        } else {
            res.status(404)
            throw new Error("Purchase não encontrado");
        }

        res.status(200).send("Purchase apagada com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/users/:id", async (req: Request, res: Response) => {

    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newEmail = req.body.email
        const newPassword = req.body.password

        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (newId.length < 3) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 3 caractere")
            }
        }

        if (newName !== undefined) {

            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("name deve ser string")
            }

            if (newName.length < 3) {
                res.status(400)
                throw new Error("name deve possuir no mínimo 1 caractere")
            }
        }

        if (newEmail !== undefined) {

            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("email deve ser string")
            }

            if (newEmail.length < 10) {
                res.status(400)
                throw new Error("email deve possuir no mínimo 10 caractere")
            }
        }

        if (newPassword !== undefined) {

            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("password deve ser string")
            }

            if (newPassword.length < 5) {
                res.status(400)
                throw new Error("password deve possuir no mínimo 6 caractere")
            }
        }

        const [user] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${idToEdit}"
        `)

        if (user) {
            await db.raw(`
                UPDATE users
                SET
                    id = "${newId || user.id}",
                    name = "${newName || user.name}",
                    email = "${newEmail || user.email}",
                    password =  "${newPassword || user.password}",
                    createdAt = "${user.createdAt}"
                WHERE
                    id = "${idToEdit}"
                `)

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send({ message: "Cadastro atualizado com sucesso" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImageUrl = req.body.imageUrl

        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (newId.length < 4) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 4 caractere")
            }
        }

        if (newName !== undefined) {

            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("name deve ser string")
            }

            if (newName.length < 3) {
                res.status(400)
                throw new Error("name deve possuir no mínimo 1 caractere")
            }
        }

        if (newPrice !== undefined) {

            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("price deve ser um numero")
            }

            if (newPrice < 10) {
                res.status(400)
                throw new Error("Não é possivel cadastrar produtos abaixo de R$10,00")
            }
        }

        if (newDescription !== undefined) {

            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("Description deve ser string")
            }

            if (newDescription.length <= 10) {
                res.status(400)
                throw new Error("Description deve possuir no mínimo 11 caractere")
            }
        }

        if (newImageUrl !== undefined) {

            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("imageUrl deve ser string")
            }

            if (!newImageUrl.includes("https://")) {
                res.status(400)
                throw new Error("Sua imagemUrl deve conter https://")
            }
        }

        const [product] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${idToEdit}"
        `)

        if (product) {
            await db.raw(`
                UPDATE products
                SET
                    id = "${newId || product.id}",
                    name = "${newName || product.name}",
                    price = "${newPrice || product.price}",
                    description =  "${newDescription || product.description}",
                    imageUrl = "${newImageUrl || product.imageUrl}"
                WHERE
                    id = "${idToEdit}"
            `)

        }

        res.status(200).send("Produto atualizado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
import { product, purchase, user } from "./types"

export const users: user[] = [
    {
        id: "001",
        name: "Fulano",
        email: "fulano@gmail.com",
        password: "111111",
        createdAt: "2023-04-23 21:39:48"
    },
    {
        id: "002",
        name: "Ciclano",
        email: "ciclano@gmail.com",
        password: "222222",
        createdAt: "2023-04-23 21:39:48"
    }
]

export const products: product[] =[
    {
        id: "p001",
        name: "Cropped",
        price: 20.50,
        description: "100% algodão",
        imageUrl: "https://moda20.com.br/wp-content/uploads/2020/02/f5f1d384ac5e5ee959d0168ec0205998.jpg"
    },
    {
        id: "p002",
        name: "Calça da Nike",
        price: 15.50,
        description: "Calça da Nike preta, com detalhes em vermelho, 80% algodão0",
        imageUrl: "https://th.bing.com/th/id/OIP.JOo0TGs_YUeJS5UkhrTigQHaHa?pid=ImgDet&rs=1"
    }
]  

export const purchases: purchase[] =[
    {
        id: "pur001",
        buyer: "001",
        totalPrice: 1,
        products: [{
            id: "p002",
            name: "Calça da Nike",
            price: 15.50,
            description: "Calça da Nike preta, com detalhes em vermelho, 80% algodão0",
            imageUrl: "https://th.bing.com/th/id/OIP.JOo0TGs_YUeJS5UkhrTigQHaHa?pid=ImgDet&rs=1",
            quantity: 1
    }]
    },
    {
        id: "pur002",
        buyer: "002",
        totalPrice: 1,
        products: [{
            id: "p002",
            name: "Calça da Nike",
            price: 15.50,
            description: "Calça da Nike preta, com detalhes em vermelho, 80% algodão0",
            imageUrl: "https://th.bing.com/th/id/OIP.JOo0TGs_YUeJS5UkhrTigQHaHa?pid=ImgDet&rs=1",
            quantity: 2
    }]
    }
]


import mercadopago from 'mercadopago';
import React,{useState,useEffect} from 'react'


export const createOrder = async (req, res) => {
    const [cart, setCart] = useCart();
    
    /*const [order, setOrder] = useState([]);

    useEffect(() => {
  const order = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
   setCart(cart);
  }
}, []);*/

    mercadopago.configure({
        access_token: "TEST-7941066120134772-122011-4908080d2f4670611b1eec73017a9624-1601374659"

    })
    /*Probemos
    const items2 = JSON.parse(localStorage.getItem('cart'))
    /*Probemos*/
    const result = await mercadopago.preferences.create({
        
        items:[
            {
                title: cart.name,
                unit_price: cart.price,
                currency_id: "ARS",
                quantity:cart.quantity,
            },
        
        ],
        back_urls:{
            success: `http://localhost:8080/api/v1/product/success`,
            failure: `http://localhost:8080/api/v1/product/failure`,
            pending: `http://localhost:8080/api/v1/product/pending`,
        },
        notification_url: "https://45a1-2803-9800-94c0-7489-548d-7726-1df2-8b58.ngrok-free.app/webhook"
    })
    console.log(result)
    res.send(result.body);
};

export const receiveWebhook = async (req,res) =>{

    console.log(req.query)
    const payment = req.query
    try {
        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment['data.id'])}
            console.log(data)
    
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ error: error.message})
    }
}

/*Crear nueva constante que capture el cart y haga push al array de items */ 

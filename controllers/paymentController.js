import mercadopago from 'mercadopago';

export const createOrder = async (req, res) => {
    
    mercadopago.configure({
        access_token: MERCADOPAGO_TOKEN,

    })
    let NewItems=localStorage.getItem("cart");
    const result = await mercadopago.preferences.create({
        
        items:[
            {
                id:NewItems._id,
                title:NewItems.name,
                quantity:NewItems.quantity,
                unit_price:NewItems.price,
            },
        items.push(NewItems)
        ],
        back_urls:{
            success: `${process.env.REACT_APP_API}/cart/success`,
            failure: `${process.env.REACT_APP_API}/cart/failure`,
            pending: `${process.env.REACT_APP_API}/cart/pending`,
        },
        notification_url: "https://45a1-2803-9800-94c0-7489-548d-7726-1df2-8b58.ngrok-free.app/webhook"
    })
    
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

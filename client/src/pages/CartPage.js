import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    
    //total price
    const totalPrice = () =>{
        try {
            let total = 0
            cart?.map(item => {total = total + item.price})
            return total.toLocaleString("en-US", {
                style:"currency",
                currency: "ARS"
            })
        } catch (error) {
            console.log(error)
        }
    }


    //delete item
    const removeCartItem = (pid) =>{
        try {
            let myCart = [...cart] 
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }


    //totalforpay
    const totalforpay =()=>{
        try {
            let total = 0
            cart?.map(item => {total = total + item.price})
            return parseInt(total);
        } catch (error) {
            
        }
    }


    //pay item
    const checkout = async () => { 
        try{
            let total = totalforpay()        
                    
            
            /*let myCart = [...cart] 
            Whaaaaat i did*/ 
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-order`, {
                description: "ORDER.DESCRIPTION",
                price: total,
                quantity: 1,
                cart: cart,
                user: auth?.user?._id
            })
        
        console.log(response.data)

        window.open(response.data.init_point); 
        navigate("/dashboard/user/orders") 
        localStorage.removeItem("cart");
        setCart([])
        }catch(error){
            console.log(error)
        
        }
    };

    
        
    return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className="col-md-12">
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length > 0 
                        ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "Your Cart is Empty"  }
                    </h4>
                    {/*<h1>{auth.user._id}</h1>*/}

                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                        {
                            cart?.map( p => (
                                <div className="row mb-2 p-3 card flex-row">
                                    <div className="col-md-4 ">
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}
                                    width="100px"
                                    height="100px" />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0,30)}</p>
                                        <p>Price : {p.price}</p>
                                        <button className='btn btn-danger' onClick={()=> removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                </div>
                <div className="col-md-4 text-center">
                    <h2>Cart Summary</h2>
                    <p>Total | Checkout | Payment</p>
                    <hr/>
                    <h4>Total : {totalPrice()}</h4>
                    {auth?.user?.address ? (
                        <>
                        <div className='mb-3'>
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            <button className='btn btn-outline-warning'
                            onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                        </div>
                        </>
                    ) : (<div>
                            {
                                auth?.token ? (
                                    <button className='btn btn-outline-warning' onClick={() => navigate ('/dashboard/user/profile')}></button>
                                ) :(<button className='btn btn-outline-warning' onClick={() => navigate ('/login', {
                                    state:"/cart",
                                })}>Please Login to Checkout</button>)
                            }
                        </div>)}
                </div>

                <button onClick={()=> checkout()} >
                            Pagar
                </button>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage
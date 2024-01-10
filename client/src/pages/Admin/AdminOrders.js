import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Select } from 'antd'
const {Option} = Select
const AdminOrders = () => {
    const [status,setStatus] = useState(["Not Process", "Processing", "Shipped","delivered", "cancel"])
    const [changeStatus, setChangeStatus] = useState("")
    const [orders, setOrders] = useState([])
    const [auth,setAuth] = useAuth();
    
    const getOrders= async() =>{
        try {
            const{data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(auth?.token) getOrders()
    },[auth?.token])
    
    const handleChange = async (orderId, value) => {   
        try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {status:value,})
        getOrders();
        } catch (error) {
        }
     
        }
    return (
    <>
    <Layout title = {"All Orders Data"}>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
            <h1 className='text-center'>All Orders</h1>
            {
                        orders?.map((o,i) =>{
                            return(
                                <div className='border shadow'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Buyer</th>
                                                <th scope='col'>Orders</th>
                                                <th scope='col'>Payment</th>
                                                <th scope='col'>Quantity</th>
                                            </tr>
                                        </thead>
                                    
                                    <tbody>
                                        <tr>
                                            <th>{i+1}</th>
                                            <th>
                                                <Select 
                                                bordered={false} 
                                                onChange={(value) => 
                                                handleChange(o._id,value)} 
                                                defaultValue={o?.status}>
                                                    {status.map((s, i) =>(
                                                        <Option key={i} value={s}>{s}</Option>
                                                    ))}
                                                </Select>
                                            </th>
                                            <th>{o?.buyer?.name}</th>
                                            <th>{moment(o?.createdAt).fromNow()}</th>
                                            <th>{o?.payment}</th>
                                            <th>{o?.products?.length}</th>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <div className='container'>
                                    {o?.products.map((p, i)=>(
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
                                        </div>
                                    </div>
                                    ))}
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
        </Layout>
    </>
  )
}

export default AdminOrders
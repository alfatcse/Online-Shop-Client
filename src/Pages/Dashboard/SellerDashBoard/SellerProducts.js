import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../AuthContext/AuthProvider';
const SellerProducts = () => {
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5009/sellerproducts?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify()
        }).then(res => res.json())
            .then(result => {

                setProduct(result);
            }).catch(e => console.log(e))
    }, [user?.email])
    const handleDelete = (id) => {
        const proceed = window.confirm('Are You Sure');
        if (proceed) {
            fetch(`http://localhost:5009/productsdelete/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Your Account Created Successfully');
                    const remaing = product.filter(ord => ord._id !== id);
                    setProduct(remaing);
                }
            }).catch(e => console.log(e))
        }
    }
    const handleUpdate = (data) => {
        data.sellMode = 'Advertised';
        console.log('update', data.sellMode);
        const remaing = product.filter(ord => ord._id !== data._id);
        const r=product.find(ord=>ord._id===data._id);
        const updateD=[r,...remaing]
        setProduct(updateD);
        fetch(`http://localhost:5009/productupdate/${data._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product update Successfully');
                }
            })
    }
    return (
        <div>
            <h1 className='font-bold'>You have products {product.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-8/12">
                    <thead>
                        <tr>
                            <th>Phone Name</th>
                            <th>Price</th>
                            <th>Sales Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map(p =>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={p.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{p.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {p?.resaleprice}
                                    </td>
                                    <td>
                                        {p?.sellMode}
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(p._id)} className="btn btn-primary btn-xs">Delete</button>
                                        {
                                            p.sellMode === 'UnSold' ? <>
                                                <button onClick={() => handleUpdate(p)} className="btn btn-primary btn-xs">Advertise</button>
                                            </> : <>
                                                <button disabled onClick={() => handleUpdate(p)} className="btn btn-primary btn-xs">Advertise</button>
                                            </>
                                        }
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerProducts;
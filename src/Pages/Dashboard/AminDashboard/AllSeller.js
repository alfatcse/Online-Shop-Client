import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../AuthContext/AuthProvider';

const AllSeller = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5009/allsellers?email=${user?.email}`;
    const [allSellers, setSellers] = useState([]);
    useEffect(() => {
        axios.get(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify()
        }).then(
            res => {
                setSellers(res.data)
            }
        )
            .catch(e => console.log(e))
    }, [user?.email])
    const handleDelete = (id) => {
        console.log('delll', id);
        fetch(`http://localhost:5009/deleteuser/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()).then(data => {
            if (data.deletedCount > 0) {
                toast.success('Seller deleted Successfully');
                const remaing = allSellers.filter(ord => ord._id !== id);
                setSellers(remaing);
            }
        }).catch(e => console.log(e))
    }
    const handleUpdate = (p) => {
        p.sellerStatus = "Verified";
        console.log('pppp', p.email);

        const r = allSellers.find(d => p._id === d._id);
        const re = allSellers.filter(d => p._id !== d._id)
        setSellers([r, ...re])
        console.log(allSellers);
        fetch(`http://localhost:5009/updatesellerstatus/${p._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('User update Successfully');
                }
            })
        fetch(`http://localhost:5009/updatesellerstatusinbooking/${p.email}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Products update Successfully');
                }
            })
    }
    return (
        <div>
            <h1 className='font-bold'>Number of Sellers {allSellers.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-8/12">
                    <thead>
                        <tr>
                            <th>Buyer Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers.map(p =>
                                <tr>
                                    <td>{p?.name}</td>
                                    <td>{p?.email}</td>
                                    <td>{p?.sellerStatus}</td>
                                    <td>
                                        <button onClick={() => handleDelete(p._id)} className="btn btn-primary btn-xs">Delete</button>
                                        {
                                            p?.sellerStatus === "unverified" ? <>
                                                <button onClick={() => handleUpdate(p)} className="btn btn-primary btn-xs">Make Verified</button>
                                            </> : <>
                                                <button disabled className="btn btn-primary btn-xs">Make Verified</button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;
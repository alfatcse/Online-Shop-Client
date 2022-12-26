import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5009/bookings?email=${user?.email}`;
    const { data: bookings = [],isLoading } = useQuery(
        {
            queryKey: ['bookings', user?.email],
            queryFn: async () => {
                const res = await fetch(url, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
        }
    )
    if(isLoading)
    {
        return <h1>Loading......</h1>
    }
    return (
        <div className='max-w-6xl  mx-auto'>
            <h1 className='font-bold mb-5 text-green-500'> You have {bookings.length} Booking</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-8/12">
                    <thead>
                        <tr>
                            <th>Phone Name</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                            <th>Chat</th>
                            <th>Payment</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(p =>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={p.productImg} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{p.productTitle}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {p?.productPrice}
                                    </td>
                                    <td> <div className='text-red-500'>{p?.paymentStatus}</div></td>
                                    <td> <Link to={`/dashboard/chat/${p._id}`}><button className='btn btn-xs btn-primary'>Chat</button></Link></td>
                                    <th>
                                        {
                                            p.paymentStatus==='Unpaid'&& <Link to={`/dashboard/payment/${p._id}`}><button className='btn btn-xs btn-primary'>Pay</button></Link>
                                        }
                                        {
                                            p.paymentStatus==='Paid'&&<span className='text-green-500'>Paid</span>
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

export default Dashboard;
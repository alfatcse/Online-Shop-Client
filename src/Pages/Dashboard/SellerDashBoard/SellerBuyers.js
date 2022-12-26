import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
const SellerBuyers = () => {
    const { user } = useContext(AuthContext);
    console.log(user.email);
    const [buyer, SetBuyer] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5009/allbuyers/${user?.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify()
        }).then(res => {
            console.log(res.data);
            SetBuyer(res.data);
        }).catch(e => console.log(e))
    }, [user?.email])
    return (
        <div>
            <h1 className='font-bold'>Number of buyers of this seller {buyer.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-8/12">
                    <thead>
                        <tr>
                            <th>Buyer Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Message</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyer.map(p =>
                                <tr>
                                    <td>
                                        {p?.buyerName}
                                    </td>
                                    <td>
                                        {p?.buyerEmail}
                                    </td>
                                    <td>
                                        {p?.buyerPhone}
                                    </td>
                                    <td><Link ><button className='btn btn-xs btn-primary'>Chat</button></Link></td>
                                    <td>
                                        {p?.buyerMeeting}
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

export default SellerBuyers;
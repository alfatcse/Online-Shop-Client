import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../AuthContext/AuthProvider';

const Allbuyer = () => {
    const { user } = useContext(AuthContext);
    console.log(user?.email);
    const url = `http://localhost:5009/allbuyers?email=${user?.email}`;
    const [allBuyers, setBuyers] = useState([]);
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
                console.log(res.data);
                setBuyers(res.data)
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
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Buyer deleted Successfully');
                    const remaing = allBuyers.filter(ord => ord._id !== id);
                    setBuyers(remaing);
                }
            }).catch(e => console.log(e))
    }
    return (
        <div>
            <h1 className='font-bold'>Number of buyers {allBuyers.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-8/12">
                    <thead>
                        <tr>
                            <th>Buyer Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers.map(p =>
                                <tr>
                                    <td>
                                        {p?.name}
                                    </td>
                                    <td>
                                        {p?.email}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(p._id)} className="btn btn-primary btn-xs">Delete</button>
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

export default Allbuyer;
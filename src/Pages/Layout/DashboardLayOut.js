import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import useUserType from '../../CustomHook/Usertype/useUserType';

const DashboardLayOut = () => {
    const { user } = useContext(AuthContext);
    const [userType] = useUserType(user?.email);
    console.log('userType', userType); 

    return (
        <div className="drawer max-w-6xl mx-auto drawer-mobile">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-blue-360 text-base-content">
                    {
                        userType === 'Seller' &&
                        <>
                            <li><Link className='text-2xl font-bold' to="/dashboard/sellerdashboard">Add Products </Link></li>
                            <li><Link className='text-2xl font-bold' to="/dashboard/sellerProducts">My Products</Link></li>
                            <li><Link className='text-2xl font-bold' to="/dashboard/sellerbuyers">My Buyers</Link></li>
                        </>

                    }
                    {
                        userType === 'Buyer' && <li><Link className='text-2xl font-bold' to="/dashboard">My Orders</Link></li>
                    }
                    {
                        userType === 'admin' &&
                        <>
                            <li><Link className='text-2xl font-bold' to="/dashboard/admindashboard">Reported Items</Link></li>
                            <li><Link className='text-2xl font-bold' to="/dashboard/allseller">All Sellers</Link></li>
                            <li><Link className='text-2xl font-bold' to="/dashboard/allbuyer">All Buyers</Link></li>
                        </>

                    }
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayOut;
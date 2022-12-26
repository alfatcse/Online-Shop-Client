import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut().then().catch(e => console.error(e));
    }
    const manuItems = <React.Fragment>
        <li><Link className='font-bold rounded-lg' to='/'>Home</Link></li>
        <li><Link className='font-bold rounded-lg' >Blog</Link></li>
        {
            user?.uid ?
                <> 
                    <li><Link className='font-bold rounded-lg' to='/dashboard'>DashBoard</Link></li>
                    <li><Link className='font-bold rounded-lg' to='/' onClick={handleLogout}>Log Out</Link></li>
                </>
                :
                <li><Link className='font-bold rounded-lg' to='/login'>Log In</Link></li>
        }
    </React.Fragment>
    return (
        <div className="navbar  flex justify-between max-w-6xl bg-blue-300 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content  mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            manuItems
                        }
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl" to='/'>
                    <div className="avatar px-4">
                        <div className="w-8 rounded">
                            <img src="https://i.ibb.co/7jYVfWB/Screenshot-2022-12-02-at-12-21-35-PM.png" alt='' />
                        </div>
                    </div>
                    Sell Now
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal   p-0">
                    {
                        manuItems
                    }
                </ul>
            </div>
            <label htmlFor="my-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;
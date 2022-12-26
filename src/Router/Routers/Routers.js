import { createBrowserRouter } from "react-router-dom";
import DashboardLayOut from "../../Pages/Layout/DashboardLayOut";
import Home from "../../Pages/Home/Home/Home";
import ProductCard from "../../Pages/Home/ProductCatagory/ProductCard/ProductCard";
import Main from "../../Pages/Layout/Main";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRouter/PrivateRoute";
import MyBookingDash from "../../Pages/Dashboard/MyBooking/MyBookingDash";
import SellerDashBoard from "../../Pages/Dashboard/SellerDashBoard/SellerDashBoard";
import AdminDashboard from "../../Pages/Dashboard/AminDashboard/AdminDashboard";
import SellerProducts from "../../Pages/Dashboard/SellerDashBoard/SellerProducts";
import AllSeller from "../../Pages/Dashboard/AminDashboard/AllSeller";
import Allbuyer from "../../Pages/Dashboard/AminDashboard/Allbuyer";
import SellerBuyers from "../../Pages/Dashboard/SellerDashBoard/SellerBuyers";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import Payment from "../../Pages/Dashboard/MyBooking/Payment";
import Chat from "../../Pages/Shared/Chat/Chat";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement:<DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayOut></DashboardLayOut></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element:<MyBookingDash></MyBookingDash>
                    },
                    {
                        path:'/dashboard/sellerdashboard',
                        element:<SellerDashBoard></SellerDashBoard>
                    },
                    {
                        path:'/dashboard/sellerbuyers',
                        element:<SellerBuyers></SellerBuyers>
                    },
                    {
                        path:'/dashboard/sellerProducts',
                        element:<SellerProducts></SellerProducts>
                    },

                    {
                        path:'/dashboard/admindashboard',
                        element:<AdminDashboard></AdminDashboard>
                    },
                    {
                        path:'/dashboard/allseller',
                        element:<AllSeller></AllSeller>
                    },
                    {
                        path:'/dashboard/allbuyer',
                        element:<Allbuyer></Allbuyer>
                    },
                    {
                        path:'/dashboard/payment/:id',
                        element:<Payment></Payment>,
                        loader:({params})=>fetch(`http://localhost:5009/bookingspayment/${params.id}`)
                    },
                    // {
                    //     path:'/dashboard/chat',
                    //     element:<Chat></Chat>
                    // }
                ]
            }
        ]
    }
   
])
export default router;
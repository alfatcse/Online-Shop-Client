import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../AuthContext/AuthProvider';
const SellerDashBoard = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHostKey = process.env.REACT_APP_ImageApi;
    const formData = new FormData();
    const { user } = useContext(AuthContext);
    const [userStatus, setUserStatus] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:5009/username?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify()
        }).then(res => {
            console.log(res.data)
            setUserStatus(res.data.sellerStatus);
            if (user.displayName === null) {
                user.displayName = res.data.name;
            }
            
        }).catch(e => console.log(e))
    })
    
    const submitHandler = (data) => {
        const image = data.image[0];
        const sellMode = "UnSold";
        formData.append('image', image);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const d = new Date();
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(imgData => {
                const productData = {
                    img: imgData.data.url,
                    name: data.MobileName,
                    originalprice: data.RealPrice,
                    resaleprice: data.ReSalePrice,
                    conditionid: data.conditionType,
                    catagoryid: data.categoryType,
                    sellerMobileNumber: data.MobileNumber,
                    sellMode,
                    sellerName:user.displayName,
                    sellerEmail:user.email,
                    useyear:data.Purchase,
                    sellerStatus:userStatus,
                    posttime:d.toLocaleDateString("en-US", options)
                }
                saveProduct(productData);
                navigate('/dashboard/sellerProducts')
            })
    }
    const saveProduct = (data) => {
        console.log(data);
        axios.post('http://localhost:5009/productupload', data).then(function (res) {
            console.log(res);
        }).catch(function (e) {
            console.log(e);
        })
    }
    return (
        <div className="hero w-full min-h-screen ">
            <div className="hero-content flex-col  lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mobile Name</span>
                                </label>
                                <input type="text" {...register("MobileName", { required: "Mobile Name is needed" })} placeholder="Mobile Name" className="input input-bordered" />
                                {errors.MobileName && <p className='text-red-600'>{errors.MobileName.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mobile Number</span>
                                </label>
                                <input type="number" {...register("MobileNumber", { required: "Mobile Number is Required" })} placeholder="Mobile Number" className="input input-bordered" />
                                {errors.MobileNumber && <p className='text-red-600'>{errors.MobileNumber.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Real Price</span>
                                </label>
                                <input type="number" {...register("RealPrice", { required: "Real Price is required" })} placeholder="Real Price" className="input input-bordered" />
                                {errors.RealPrice && <p className='text-red-600'>{errors.RealPrice.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">ReSale  Price</span>
                                </label>
                                <input type="number" {...register("ReSalePrice", { required: "ReSale Price is required" })} placeholder="ReSale Price" className="input input-bordered" />
                                {errors.ReSalePrice && <p className='text-red-600'>{errors.ReSalePrice.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input type="text" {...register("Location", { required: "Location is needed" })} placeholder="Your Location" className="input input-bordered" />
                                {errors.Location && <p className='text-red-600'>{errors.Location.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Year of Uses</span>
                                </label>
                                <input type="number" {...register("Purchase", { required: "Purchase is needed" })} placeholder="Year of Purchase" className="input input-bordered" />
                                {errors.Purchase && <p className='text-red-600'>{errors.Purchase.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Please Select a Condition</span>
                                </label>
                                <select {...register("conditionType", { required: "Please Select a Category" })} className="select w-full select-bordered">
                                    <option disabled selected>Pick a category</option>
                                    <option>Excellent</option>
                                    <option>Good</option>
                                    <option>Fair</option>
                                </select>
                                {errors.userType && <p className='text-red-600'>{errors.userType.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Please Select a Category</span>
                                </label>
                                <select {...register("categoryType", { required: "Please Select a Category" })} className="select w-full select-bordered">
                                    <option disabled selected>Pick a category</option>
                                    <option>IOS</option>
                                    <option>Android</option>
                                    <option>Other</option>
                                </select>
                                {errors.userType && <p className='text-red-600'>{errors.userType.message}</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="file"  {...register("image", { required: "Image is required" })} />
                                {errors.img && <p className='text-red-600'>{errors.img.message}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashBoard;
//new
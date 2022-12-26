import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../AuthContext/AuthProvider';
import useTitleHook from '../../CustomHook/TitleHook/useTitleHook';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../CustomHook/UseToken/useToken';
const SignUp = () => {
    useTitleHook('SignUp');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const [signinError, setsigninError] = useState('');
    const [signUserEmail, setsignUserEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from.pathname || '/';
    const [token] = useToken(signUserEmail);
    if (token) {
        navigate(from, { replace: true })
    }
    const submitHandler = (data) => {
        console.log(data.name, data.email, data.password, data.userType);
        createUser(data.email, data.password)
            .then(result => {
                toast.success('Your Account Created Successfully');
                console.log(result);
                if (data.userType === 'Seller') {
                    const sellerStatus="unverified";
                    saveSeller(data.name, data.email, data.userType,sellerStatus);
                }
                else {
                    saveBuyer(data.name, data.email, data.userType);
                }
                setsignUserEmail(data.email);
                navigate(from, { replace: true });
            })
            .catch(e => {
                console.error(e);
                setsigninError(e.message);
            })
    }
    const saveBuyer = (name, email, userType) => {
        const user = { name, email, userType };
        axios.post('http://localhost:5009/users', user).then(function (res) {
            console.log(res);
        }).catch(function (e) {
            console.log(e);
        })
    }
    const saveSeller = (name, email, userType,sellerStatus) => {
        const user = { name, email, userType ,sellerStatus};
        axios.post('http://localhost:5009/users', user).then(function (res) {
            console.log(res);
        }).catch(function (e) {
            console.log(e);
        })
    }
    const handleGoogleSignin = () => {
        setsigninError('');
        signInWithGoogle().then(
            result => {
                console.log(result);
                navigate(from, { replace: true })
            }
        ).catch(e => {
            console.log(e);
            setsigninError(e.message);
        })
    }
    return (
        <div className="hero max-w-6xl  mx-auto min-h-screen ">
            <div className="hero-content flex-col  lg:flex-row-reverse">
                <div className="text-center px-40 lg:text-left">
                    
                    <img className='mt-4' style={{ width: '80%' }} src="https://i.ibb.co/54mCxrW/Sign-in-amico.png" alt="" srcset="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(submitHandler)}>
                        <h1 className="text-5xl text-center mb-4 text-blue-500 font-bold">Sign Up now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: "Name is Required" })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: "Email is required" })} placeholder="email" className="input input-bordered" />
                                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Please Select a Category</span>
                                </label>
                                <select {...register("userType", { required: "Please Select a Category" })} className="select w-full select-bordered">
                                    <option disabled selected>Pick a category</option>
                                    <option>Buyer</option>
                                    <option>Seller</option>
                                </select>
                                {errors.userType && <p className='text-red-600'>{errors.userType.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password",
                                    {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Must be 6 character long" },
                                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, message: "Password must be upperCase and Special Character" }
                                    })}
                                    placeholder="password" className="input input-bordered" />
                                {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                        <p>Already have an Account <Link className='text-primary' to="/login">Log in Now</Link></p>
                        <div className='divider'>OR</div>
                        <button onClick={handleGoogleSignin} className='btn btn-outline btn-info w-full'>CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
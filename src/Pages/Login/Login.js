import React, { useContext, useState } from 'react';
import useTitleHook from '../../CustomHook/TitleHook/useTitleHook';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../CustomHook/UseToken/useToken';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    useTitleHook('Login');
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from.pathname || '/';
    console.log('from', from);
    const { loginUser, signInWithGoogle } = useContext(AuthContext);
    const [token] = useToken(loginUserEmail);
    if (token) {
        navigate(from, { replace: true })
    }
    const submitHandlerLogin = (data) => {
        console.log(data.email, data.password);
        setLoginError('');
        loginUser(data.email, data.password)
            .then(result => {
                console.log(result);
                toast.success('login Successful');
                setLoginUserEmail(data.email);
            })
            .catch(e => {
                console.log(e);
                setLoginError(e.message);
            })
    }
    const handleGoogleSignin = () => {
        setLoginError('');
        signInWithGoogle().then(
            result => {
                console.log(result);
                navigate(from, { replace: true })
            }
        ).catch(e => {
            console.log(e);
            setLoginError(e.message);
        })
    }
    return (
        <div className="hero max-w-6xl  mx-auto min-h-screen ">
            <div className="hero-content flex-col  lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(submitHandlerLogin)}>
                        <h1 className="text-5xl text-center mb-4 text-blue-500 font-bold">Log In now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: "Email is required" })} placeholder="email" className="input input-bordered" />
                                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
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
                                <button className="btn  btn-primary">Login</button>
                            </div>
                        </form>
                        <p>New to Sell Now <Link className='text-primary' to="/signup">Create an Account</Link></p>
                        <div className='divider'>OR</div>
                        <button onClick={handleGoogleSignin} className='btn  btn-info btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
                <div className="text-center px-40 lg:text-left">
                    
                    <img className='mt-4' style={{ width: '80%' }} src="https://i.ibb.co/Kz9YKTg/Tablet-login-pana.png" alt="" srcset="" />
                </div>
            </div>
        </div>
    );
};

export default Login;
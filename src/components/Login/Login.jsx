import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from "react-router-dom";
const Login = () => {
    const [registerError, setLoginError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const emailRef = useRef(null);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if(result.user.emailVerified){
                     setSuccess('Email successfully added')
                }
                else{
                    alert('Please verified your email')
                }
               
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message)
                setSuccess('')
            })

        if (password.length < 6) {
            setLoginError('Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setLoginError('Your password should have at least one uppercase character')
            return;
        }
    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('sent valid email', emailRef.current.value)
            return
        }
        else if (!emailRegex.test(email)) {
            console.log('please input a valid email')
            return
        }

        //send validation ;
        sendPasswordResetEmail(auth ,email)
        .then(()=>{
            alert('please check your email')
        })
        .catch(error =>{
            console.log(error.message)
        })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div>
                        <div>
                            <div>
                                {
                                    registerError && <p className="text-red-600 font-bold">{registerError}</p>
                                }
                                {
                                    success && <p className="text-green-600 font-bold">{success}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        placeholder="email"
                                        name="email"
                                        className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>

                                    <div className="flex items-center">
                                        <input type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="password" className="input input-bordered relative w-full" />
                                        <div className="text-xl absolute ml-72" onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                                            }
                                        </div>
                                    </div>

                                    <label className="label">
                                        <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            <p>New to this website ? Please  <Link className="text-red-600 font-semibold underline" to="/register">Register</Link>  </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
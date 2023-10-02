import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPass, setShowPass] = useState(false)
    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted, name)
        setRegisterError('')
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one uppercase character')
            return;
        }
        else if (!accepted) {
            setRegisterError('please accept our terms and conditions')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('Email successfully added')
                //update Profile 
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => {
                        console.log('profile updated')
                    })
                    .catch(error => console.log(error.message))
                //send verification email ;
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('please check your email and verify your account')
                    })
            })
            .catch(error => {
                console.log(error.message)
                setRegisterError(error.message)
                setSuccess('')
            })
    }

    return (
        <div >
            <div className="mx-auto md:w-1/2">
                <h4 className="text-3xl font-bold text-pink-500">Please Register</h4>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="please input your name" className="mb-4 w-3/4 px-4 py-2" type="name"
                        name="name" required />
                    <input
                        placeholder="please input email" className="mb-4 w-3/4 px-4 py-2" type="email"
                        name="email" required />
                    <br />
                    <div className="flex items-center">
                        <input
                            placeholder="please input password"
                            className="px-4 py-2 mb-4 w-3/4" type={showPass ? "text" : "password"}
                            name="password" required />
                        <span className="text-xl relative -ml-6 mb-4" onClick={() => setShowPass(!showPass)}>
                            {
                                showPass ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                            }
                        </span>
                    </div>
                    <br />
                    <div className="flex items-center">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2 " htmlFor="terms">Accept our <a href="">Terms and Conditions</a> </label>
                    </div>
                    <br />
                    <p>Already have an account ? Please  <Link className="text-red-600 font-semibold underline" to="/login">Login</Link>  </p>
                    <br />
                    <input className="btn btn-secondary mb-4 w-3/4" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
            </div>
        </div>

    );
};

export default Register;
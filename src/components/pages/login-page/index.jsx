import { useState } from "react";
import { useForm } from "react-hook-form"; //install
import { useHistory } from "react-router-dom";
import './styles.css';
import { RiCake3Line } from 'react-icons/ri';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const LoginPage = () => {

    //use the user state hook to define the mode of the login/sign up
    const [mode, setMode] = useState("login");

    //use the user form hook to define the register value
    const {register, handleSubmit} = useForm();

    //use the use history hook to define the history
    const history = useHistory();

    //define functionality to log user into website
    const loginUser = async(formVals) => {
        //try to log user in, if not, display error
        try {
            //get authentication
            const auth = getAuth();
            //log user in with email and password from form
            const loginUser = await signInWithEmailAndPassword(auth, formVals.user, formVals.password);
            //navigate user to home page
            history.push('/');
        } catch(error) {
            console.log ("Error connecting to Firebase", error)
        }
    }

    //define functionality to sign user up for website
    const signUpUser = async(formVals) => {
        //get authentication
        const auth = getAuth();
        //try to sign user up, if not, display error
        try {
            //sign up user with email and password from form
            const signUpUser = await createUserWithEmailAndPassword(auth, formVals.user, formVals.password);
            //navigate user to home page
            history.push('/');
            console.log("New user was created", signUpUser);
        } catch(error) {
            console.log ("Error from Firebase", error)
        }
    }

    //return page with login/sign up form fields
    return (
        <div className="login-page">
            {/*display logo and site title*/}
            <RiCake3Line className="icon" />
            <h1 className="login-title">Sweet Talk</h1>
            {/*display card with login/sign up form fields*/}
            <div className="login-container">
                {/*display the login form if state is set to login*/}
                { mode === "login" && (
                        <form className="login-layout" onSubmit={handleSubmit(loginUser)}>
                            <h2>Welcome back, please log in!</h2>
                            <br/>

                            {/*define user form field*/}
                            <label htmlFor="user">Email</label>
                            <input type="email" required name="user" {...register('user')}/>

                            {/*define password form field*/}
                            <label htmlFor="password">Password</label>
                            <input type="password" required name="password" {...register('password')}/>

                            {/*define submit button*/}
                            <input type="submit" value="Login"/>
                            <br/>

                            <hr class="login-divider"></hr>
                            <p>Don't have an account? Create a new account now!</p>
                            {/*define sign up button that changes state to sign up*/}
                            <button onClick={()=> setMode("signup")}>Sign Up</button>
                        </form>
                    )
                }

                {/*display the sign up form if state is set to login*/}
                { mode === "signup" && (
                        <form className="login-layout" onSubmit={handleSubmit(signUpUser)}>
                            <h2>Welcome! Please create an account to continue.</h2>
                            <br/>

                            {/*define user form field*/}
                            <label htmlFor="user">Email</label>
                            <input type="email" required name="user" {...register('user')}/>

                            {/*define password form field*/}
                            <label htmlFor="password">Password</label>
                            <input type="password" required name="password" {...register('password')}/>

                            {/*define password form field*/}
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <input type="password" required name="passwordConfirm" {...register('passwordConfirm')}/>

                            {/*define submit button*/}
                            <input type="submit" value="Sign Up"/>
                            <br/>

                            <hr class="login-divider"></hr>
                            <p>Already have an account?</p>
                            {/*define login button that changes state to login*/}
                            <button onClick={()=> setMode("login")}>Login</button>
                        </form>
                    )
                }
            </div>
        </div>
    )
}
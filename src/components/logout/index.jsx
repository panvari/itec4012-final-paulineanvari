import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import "./styles.css";

export const Logout = () => {
    //define user variable
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            //get authentication
            const auth = getAuth();
            
            //perform when authentication changes
            onAuthStateChanged(auth, (user) => {
                //check if a user is logged in
                if (user) {
                    //if a user is logged in, set user variable
                    setUser(user);
                } else {
                    //if no user is logged in, set user variable to null
                    setUser(null);
                }
            })
        },[]
    )

    //performs logout user functions
    const logoutUser = async() => {
        //get authentication
        const auth = getAuth();

        //try to sign out user, if sign out cannot be done, display an error
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    //return button that performs logout user function on click
    return (
        user && <button className="logout-btn" onClick={logoutUser}>
            Logout
        </button>
    )
}
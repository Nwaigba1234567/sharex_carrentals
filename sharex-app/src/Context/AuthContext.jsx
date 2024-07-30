import axios from "axios";
import { createContext, useEffect, useState } from "react";


//code to create the context
const AuthContext = createContext();
const API_URL=import.meta.env.API_URL || "http://localhost3000";

//the wrapper that will wrap my app
const AuthWrapper = ({ children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    //this function checks if there is a token and if so, if it is valid
    const authenticateUser = async () => {

        //check the localStorage for the token
        const Token = localStorage.getItem("authToken");
        if (Token) {
            try {
                //this is if there is a token then we need to verify it
                const response = await axios("http://localhost:3000/auth/verify", {
                    headers: {
                        authorization: `Bearer ${Token}`,
                    },
                });  
                console.log("authenticate user", response.data);
                setUser(response.data);
                setLoading(false);
                setLoggedIn(true);   

            } catch (err) {
                console.log("There was an error authenticating the user", err);
                setUser(null);
                setLoading(false);
                setLoggedIn(false);
            }
        } else {
            setUser(null);
            setLoading(false);
            setLoggedIn(false);
        }
        //if there is a token then valid it with the /verify route
        //if no token then set states to null and LoggedIn to false
    };

     //every time the application mounts, we try to authenticate the user
     useEffect(()=>{
        authenticateUser();
     }, [])

     //logout function
   const handleLogout = async () => {
    localStorage.removeItem("authToken");
    await authenticateUser();
   };
  return (
    <AuthContext.Provider value={{user, setUser, loading, loggedIn, authenticateUser, handleLogout}}>{children}</AuthContext.Provider>
  );
};
export { AuthContext, AuthWrapper };
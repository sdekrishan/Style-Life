import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserPrivateRoute = ({children}) => {
    const {isAuth} = useSelector(store => store.auth)
    // const user = JSON.parse(localStorage.getItem("StyleLifeUserData")) || false; 
    console.log(isAuth)

    if(isAuth){
        return children
    }
    else{
        return <Navigate to='/'/>
    }
  
}

export default UserPrivateRoute
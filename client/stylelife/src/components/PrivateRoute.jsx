import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    // console.log(user);
    const token = JSON.parse(localStorage.getItem("StyleLifeAdminData")) || ""
    // const {adminToken} = useSelector(store=> store.auth)
    if(token){
        return children
    }
    else{
       return <Navigate to={'/'}  />
    }
}

export default PrivateRoute
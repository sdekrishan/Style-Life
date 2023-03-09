import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
const UserPrivateRoute = ({children}) => {
    const {isAuth} = useSelector(store => store.auth)
    // const user = JSON.parse(localStorage.getItem("StyleLifeUserData")) || false; 
    const toast = useToast()
  
    console.log(isAuth)

    if(isAuth){

        return children
    }
    else{
        toast({
            title: 'You are not logged In.',
            description: "Please login to access this page.",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:'top',
          })
     
        return <Navigate to='/'/>
    }
  
}

export default UserPrivateRoute
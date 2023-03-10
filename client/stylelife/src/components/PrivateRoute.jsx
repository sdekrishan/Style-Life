import React from 'react'
import { Navigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const PrivateRoute = ({children}) => {
    const token = JSON.parse(localStorage.getItem("StyleLifeAdminData")) || "";
    const toast = useToast()

    if(token){
        return children
    }
    else{
        toast({
            title: 'You are not logged in as Admin.',
            description: "Please login as Admin to access this page.",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:'top',
          })
       return <Navigate to={'/'}  />
    }
}

export default PrivateRoute
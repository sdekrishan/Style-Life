import { Box, Button, ButtonGroup, Flex, Grid, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import './AdminHome.scss';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { AddHealth, AddRestro, AddSpa, getAllHealth, getAllRestro, getAllSpa, getAllUser } from '../../Redux/Admin/AdminTypes';
import { useState } from 'react';
import AdminSpa from './AdminSpa/AdminSpa';
import AdminRestro from './AdminRestro.jsx/AdminRestro';
import AdminHealth from './AdminHealth/AdminHealth';
import Loader from '../../components/Loader/Loader';
import AdminUser from './AdminUser/AdminUser';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';

const AdminHome = () => {
    const {spa,restro,health,AdminLoading,user} = useSelector(store=>store.admin);
    const { isOpen:isRestroOpen, onOpen:OnRestroOpen, onClose:onRestroClose } = useDisclosure();
    const { isOpen:isSpaOpen, onOpen:OnSpaOpen, onClose:onSpaClose } = useDisclosure();
    const { isOpen:isHealthOpen, onOpen:OnHealthOpen, onClose:onHealthClose } = useDisclosure();
    const [restValue, setRestValue] = useState(true);
    const [spaValue, setSpaValue] = useState(false);
    const [healthValue, setHealthValue] = useState(false);
    const [userValue, setUserValue] = useState(false);
    const [restroAddName, setRestroAddName] = useState("");
    const [restroAddAdress, setRestroAddAddress] = useState("");
    const [restroAddOffers, setRestroAddOffers] = useState("");
    const [restroAddImg, setRestroAddImg] = useState("");
    const [spaAddName,   setSpaAddName] = useState("");
    const [spaAddAdress, setSpaAddAddress] = useState("");
    const [spaAddOffers, setSpaAddOffers] = useState("");
    const [spaAddImg,    setSpaAddImg] = useState("");
    const [healthAddName,   setHealthAddName] = useState("");
    const [healthAddAdress, setHealthAddAddress] = useState("");
    const [healthAddOffers, setHealthAddOffers] = useState("");
    const [healthAddImg,    setHealthAddImg] = useState("");
    const dispatch = useDispatch();
    
    useEffect(()=>{
      dispatch(getAllRestro())
    },[]);

    console.log(restro)

    const handleUser = ()=>{
      setRestValue(false);
      setSpaValue(false);
      setHealthValue(false);
      setUserValue(true);
      dispatch(getAllUser ())
    }


const handleRestroPost = (e)=>{
  e.preventDefault();
  const payload={
    img_src:restroAddImg,
    name:restroAddName,
    offers:restroAddOffers,
    address:restroAddAdress
  };
  dispatch(AddRestro(payload))
}
const handleSpaPost = (e)=>{
  e.preventDefault();
  const payload={
    img_src:spaAddImg,
    name:spaAddName,
    category:spaAddOffers,
    address: spaAddAdress
  };
  dispatch(AddSpa(payload))
}

const handleHealthPost = (e)=>{
  e.preventDefault();
  const payload={
    img:healthAddImg,
    name:healthAddName,
    category:healthAddOffers,
    address: healthAddAdress
  };
  dispatch(AddHealth( payload))
}
if(AdminLoading ){
  return <Loader/>
}

  return (
    <Flex className='maindiv'  flexDirection={{base:"column",sm:"column",md:"row",lg:"row"}}>
    <Box w={{base:"80%",sm:"80%",md:"25%"}} h='fit-content' position={{base:"static",sm:"static",md:"fixed",lg:"fixed"}} className='sidebar'>
    <Box display={'flex'} flexDirection='column' h='fit-content'>
    <Text fontWeight={'bold'} fontSize='lg' mb='2rem'>DashBoard</Text>
       
        <ButtonGroup w={"100%"}  isAttached variant='outline' >
        <Button  className='admin_categories' fontSize={{base:"sm",sm:"sm",md:"md"}} onClick={()=>{
          setRestValue(true);
          dispatch(getAllRestro ());
          setSpaValue(false);
          setHealthValue(false);
        }}>Restaurants</Button>
  <IconButton aria-label='Add to friends' icon={<AddIcon  />} backgroundColor={'#ef534e'} onClick={OnRestroOpen} />
</ButtonGroup>

<ButtonGroup  w={"100%"} isAttached variant='outline'>
<Button className='admin_categories' fontSize={{base:"sm",sm:"sm",md:"md"}} onClick={()=>{
               setRestValue(false);
               setSpaValue(true);
               dispatch(getAllSpa());
               setHealthValue(false);
        }}>Spa</Button>
  <IconButton aria-label='Add to friends' icon={<AddIcon />} backgroundColor={'#ef534e'} onClick={OnSpaOpen}/>
</ButtonGroup>
    

<ButtonGroup w={"100%"} isAttached variant='outline'>
<Button className='admin_categories' fontSize={{base:"sm",sm:"sm",md:"md"}} onClick={()=>{
               setRestValue(false);
               setSpaValue(false);
               setHealthValue(true);
               dispatch(getAllHealth())
        }}>Health</Button>
  <IconButton aria-label='Add to friends' icon={<AddIcon />} backgroundColor={'#ef534e'} onClick={OnHealthOpen} />
</ButtonGroup>
       
<ButtonGroup w={"100%"} isAttached variant='outline'>
<Button className='admin_categories' fontSize={{base:"sm",sm:"sm",md:"md"}} onClick={handleUser}>Users</Button>
  </ButtonGroup>


        
    </Box>
    </Box>
     <Box w={{base:"80%",sm:"80%",md:"72%"}} mt={{base:"2rem",sm:"2rem",md:"0"}}  marginInline='auto' className='rightbar' position={{base:"static",sm:"static",md:"absolute",lg:"absolute"}}  >
    <Text fontSize={'lg'} fontWeight='bold' fontStyle={'italic'}>{restValue ? "Restaurants" : spaValue ? "Spa" : healthValue ? "Health" : "Users And Admin"}</Text>
    <Grid className='divide-section' w='full' templateColumns={{sm:"repeat(2,1fr)",md:"repeat(3,1fr)"}} gap='1rem' padding='1rem' >

    {
      restValue ? restro.length > 0 && restro?.map((el,ind)=><AdminRestro key={ind} Data={el} />)
    : spaValue ? spa?.map((el,ind)=><AdminSpa Data={el} key={ind}/>)
    : healthValue ? health?.map((el,ind)=><AdminHealth key={ind} Data={el}/>)
    : user?.map((el,ind)=><AdminUser key={ind} Data={el}/>)

    }

    </Grid>
    </Box>
    {/* for restro adding */}
    <Modal isOpen={isRestroOpen} onClose={onRestroClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Restaurant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem   count={2} /> */}
            Fill the required Details which you want to update
            <form action="" style={{display:'flex',flexDirection:'column'}} onSubmit={handleRestroPost}>
              <label htmlFor="">Name</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setRestroAddName(e.target.value)} />
              <label htmlFor="">Address</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setRestroAddAddress(e.target.value)} />
              <label htmlFor="">Image</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setRestroAddImg(e.target.value)} />
              <label htmlFor="">Offers</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setRestroAddOffers(e.target.value)} />
              <Input type={'submit'} value='Add' bgColor={'green.500'} w='50%' m='auto' mt='1rem'/>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onRestroClose}>
              Close
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* for spa posting */}
      <Modal isOpen={isSpaOpen} onClose={onSpaClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Spa/Massage Center</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem   count={2} /> */}
            Fill the required Details which you want to update
            <form action="" style={{display:'flex',flexDirection:'column'}} onSubmit={handleSpaPost}>
              <label htmlFor="">Name</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setSpaAddName(e.target.value)} />
              <label htmlFor="">Address</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setSpaAddAddress(e.target.value)} />
              <label htmlFor="">Image</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setSpaAddImg(e.target.value)} />
              <label htmlFor="">Category</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setSpaAddOffers(e.target.value)} />
              <Input type={'submit'}  value='Add' bgColor={'green.500'} w='50%' m='auto' mt='1rem' />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSpaClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* for health posting */}
      <Modal isOpen={isHealthOpen} onClose={onHealthClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Spa/Massage Center</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem   count={2} /> */}
            Fill the required Details which you want to update
            <form action="" style={{display:'flex',flexDirection:'column'}} onSubmit={handleHealthPost  }>
              <label htmlFor="">Name</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setHealthAddName(e.target.value)} />
              <label htmlFor="">Address</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setHealthAddAddress(e.target.value)} />
              <label htmlFor="">Image</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setHealthAddImg(e.target.value)} />
              <label htmlFor="">Category</label>
              <Input type="text" placeholder='name' required onChange={(e)=>setHealthAddOffers(e.target.value)} />
              <Input type={'submit'}  value='Add' bgColor={'green.500'} w='50%' m='auto' mt='1rem'/>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onHealthClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default AdminHome
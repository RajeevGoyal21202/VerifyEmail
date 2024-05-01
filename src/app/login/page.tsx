"use client"
import { Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import styles from "./login.module.css"
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [user,setUser] = useState({
    email:"",
    password:"",
    
  })
  const [buttonDisabled,setButtonDisabled]= useState(false)
  const [loading,setLoading]= useState(false) 

  const onSignup = async () => {
    try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login success", response.data);
        router.push("/profile");
        
    } catch (error:any) {
        console.log("Login failed", error.message);
        
        toast.error(error.message);
    }finally {
        setLoading(false);
    }
}
useEffect(() => {
  if(user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false);
  } else {
      setButtonDisabled(true);
  }
}, [user]);

  return (
    <div className={styles.Container}>
       <Card className={styles.Card}>
        <CardContent className={styles.CardContent}>
          <Typography className='typography' fontWeight="600" fontSize={"20px"}>Login</Typography >
          <Stack gap={"15px"} sx={{mt:2}}>
            <TextField placeholder='Please enter your Email' type="email" value={user.email} required onChange={(e)=>{setUser({...user,email:e.target.value})}}></TextField>
            <TextField placeholder='Please enter your Password' type='password'  value={user.password} required onChange={(e)=>{setUser({...user,password:e.target.value})}}></TextField>
            <Button type='submit' variant='contained' disabled={buttonDisabled}  onClick={onSignup}>{loading? "Loading....":"Signup" }</Button>
          </Stack>
        </CardContent>
      </Card>
    
    </div>
  )
}

export default Login

"use client"
import { Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import styles from "./signup.module.css"
import { useRouter } from 'next/navigation';
const Signup = () => {
  const router = useRouter();
  const [user,setUser] = useState({
    username:"",
    email:"",
    password:"",
    
  })
  const [buttonDisabled,setButtonDisabled]= useState(false)
  const [loading,setLoading]= useState(false) 

  const onSignup = async () => {
    try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup success", response.data);
        router.push("/login");
        
    } catch (error:any) {
        console.log("Signup failed", error.message);
        
        toast.error(error.message);
    }finally {
        setLoading(false);
    }
}



  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [user]);
  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <CardContent className={styles.CardContent}>
          <Typography className='typography' fontWeight="600" fontSize={"20px"}>Sign Up</Typography >
          <Stack gap={"15px"} sx={{mt:2}}>
            <TextField placeholder='Please enter your Name' type='text' value={user.username} required onChange={(e)=>{setUser({...user,username:e.target.value})}}></TextField>
            <TextField placeholder='Please enter your Email' type="email" value={user.email} required onChange={(e)=>{setUser({...user,email:e.target.value})}}></TextField>
            <TextField placeholder='Please enter your Password' type='password'  value={user.password} required onChange={(e)=>{setUser({...user,password:e.target.value})}}></TextField>
            <Button type='submit' variant='contained' disabled={buttonDisabled}  onClick={onSignup}>{loading? "Loading....":"Signup" }</Button>
          </Stack>
        </CardContent>
      </Card>

    </div>
  )
}

export default Signup

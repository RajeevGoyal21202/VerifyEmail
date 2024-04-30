import { connectDb } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { error } from "console";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import {NextRequest,NextResponse} from "next/server"

connectDb()

export async function POST(request:NextRequest){
    try{
       const reqBody = await request.json()
       const {email,password} = reqBody
       //validation

       console.log(reqBody);

       const user = await User.findOne({email})

       if(!user){
        return NextResponse.json({error:"User not found"},{status:404})
       }

       const validPassword =  bcryptjs.compare(user.password,password)

       if(!validPassword){
        return NextResponse.json({error:"Invalid credentials"},{status:401})
       }


      const token =  await jwt.sign({id:user._id},process.env.TOKEN_SECRET!,{expiresIn:'1h'})

       const response =  NextResponse.json({
        message:"User login successfully",
        success:"true",
       })

       response.cookies.set("token",token,{
        httpOnly:true
       })
       return response
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
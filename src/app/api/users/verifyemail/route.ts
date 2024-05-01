import { connectDb } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { error } from "console";

import {NextRequest,NextResponse} from "next/server"

connectDb()

export async function POST(request:NextRequest){
    try{
        const reqbody = await request.json();
        const {token} = reqbody;
        console.log(token)

        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        console.log("verify user.................",user)

        if(!user){
            return  NextResponse.json({error:"Invalid Token"},{status:400})
            
        }
        user.isVerfied = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message:"Email verified sucessfully", sucess:true},{status:200})
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
        console.log(error)
    }
}

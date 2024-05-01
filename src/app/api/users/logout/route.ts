import { connectDb } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { error } from "console";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import {NextRequest,NextResponse} from "next/server"

connectDb()

export async function POST(request:NextRequest){
    try{
        console.log("sssssssssssssssssssssss")
        const response = NextResponse.json({
            message:"LogoutSucessfully",
            success:true
        })
        response.cookies.set("token","",{httpOnly:true,expires: new Date(0) })

        return response
    }
    catch(err:any){
        console.log(err)
        return NextResponse.json({error:err.message},{status:500})
    }
}
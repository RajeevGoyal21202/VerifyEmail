import { connectDb } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server"

connectDb();

export async function POST (request:NextRequest){
    //extract data from token 
    const userId = await getDataFromToken(request)

   const user  =  await User.findOne({_id:userId}).select("-password -username")

   //check if there is user 

   return NextResponse.json({
    message:"User found",
    data:user
   })
}
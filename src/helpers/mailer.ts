import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
export const sendEmail = async({email,emailType,userId}:any)=>{
    try{

      const hashToken = await bcryptjs.hash(userId.toString(),10)
      console.log("token",hashToken)
      

        //todo configure mail for useage

        if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId,
            {
              $set:{verifyToken:hashToken,
              verifyTokenExpiry:Date.now()+3600000}
            }
          )
        }
        else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId, 
              { $set:{forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000}})
      }
        
        var transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "c1fc2014081179",
            pass: "467146889f332b"
          }
        });
      const mailOptions ={
        from: '3241rajeev@gmail.com', 
        to: email, 
        subject: emailType === 'VERIFY'?"Verify your email":"Rest your password", 
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
        </p>`
       // html body
      }
      const mailResponse = await transporter.sendMail(mailOptions)
      return mailResponse
    }
    catch(err:any){
        throw new Error(err.message)

    }
}
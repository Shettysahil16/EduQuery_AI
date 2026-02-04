import userModel from "../../models/User_Model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userLoginController = async(req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        message: "Please provide all the required fields.",
        success: false,
        error: true,
      })
    }

    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).json({
        message : "user does not exist",
        success : false,
        error : true
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
      return res.status(422).json({
        message: "invalid credentials",
        success: false,
        error: true,
      });
    }

    const {password : _ , ...userWithoutPassword} = user.toObject();

    const payload = {
      _id : user._id,
      email : user._email
    }

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "30d",
    })

    const tokenOption = {
      httpOnly: true,
      secure: false,
    };

    return res.cookie("token", jwtToken, tokenOption).status(200).json({
      message: "login successful",
      data: userWithoutPassword,
      token: jwtToken,
      success: true,
      error: false,
    });



  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export default userLoginController;

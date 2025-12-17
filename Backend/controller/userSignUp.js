import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

const userSignUpController = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // validation for checking empty fields
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please provide all the required fields.",
        success: false,
        error: true,
      });
    }

    //validation for checking password and confirm password are matching
    if(password !== confirmPassword){
        return res.status(400).json({
        message: "Passwords do not match.",
        success: false,
        error: true,
      });
    }

    //finding user from database from email
    const user = await userModel.findOne({email})

    //validation for checking if user already exists in the database
    if(user){
        return res.status(409).json({
        message: "User already exists with this email.",
        success: false,
        error: true,
      });
    }

    //hashing the password before saving in database
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //putting user details in newUser variable with hashed password
    const newUser = new userModel({
        fullName,
        email,
        password : hashPassword,
    })

    //saved the user details of newUser in database
    const savedUser = await newUser.save();
    return res.status(201).json({
      message: "user created successfully",
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

export default userSignUpController;

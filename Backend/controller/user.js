import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../jwt/generateToken.js";
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password does not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await new User({ name, email, password: hashedpassword, confirmpassword });
        await newUser.save();
        if (newUser) {
            
            createToken(newUser._id, res);
            return res.status(201).json({
                message: "User created successfully", user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });

        }

    }
    catch (e) {
        console.log("error", e);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const Signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Sign-In Request Received:", { email });
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      console.log("User Found:", user);
  
      // Generate the token
      const token = createToken(user._id, res); // Set cookie on response
  
      console.log("Token:", token);
      return res.status(200).json({
        message: "User signed in successfully",
        user: {
          name: user.name,
          email: user.email,
        },
        token: token, // Send the token in the response
      });
    } catch (e) {
      console.error("Error during Sign-In:", e.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };


export const Signout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User signed out successfully" });
    }
    catch (e) {
        console.log("error", e);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const getUser = async (req, res) => {
    try {
     const loggedinuser = req.user._id;
    
    const users = await User.find({ _id: { $ne: loggedinuser } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const secureroute = async (req, res, next) => {
  try {
    console.log('Cookies received:', req.cookies); // Debugging cookies

    const token = req.cookies.jwt;  // Retrieve token from cookies
    console.log('Received Token from Cookie:', token);

    if (!token) {
      console.error('Unauthorized: No token provided');
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    console.log('Verified Token:', verified);

    // Find the user in the database
    const user = await User.findById(verified.userId).select('-password');
    if (!user) {
      console.error('Unauthorized: User not found');
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user;  // Attach user to request
    next();  // Proceed to the next middleware or route
  } catch (error) {
    console.error('Error in secureroute middleware:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized: Invalid token signature' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default secureroute;

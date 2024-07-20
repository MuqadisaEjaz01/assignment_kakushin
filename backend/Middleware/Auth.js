import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config(); 

const authMiddleware  = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader.split(' ')[1];
  console.log(token)
  if (token == null) {
    res.send("Token not provided");
    return;
  }
  try {
    const decodedToken = jwt.verify(token, process.env.Key);

    const email = decodedToken.email;
    console.log(email);
    req.body.email = email
   

  } catch {
    return res.send("Invalid token");
  }
  next();
}

export default authMiddleware;
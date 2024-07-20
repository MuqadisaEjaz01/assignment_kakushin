import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
import User from "../Models/User.js";
import dotenv from 'dotenv';
dotenv.config(); 


//*******************Create A User****************************** */
const addUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);


      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
        await newUser.save();
  

     res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

  //*****************Login a User*************************** */

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email)

      const user = await User.findOne({ email });
    
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const found = await bcrypt.compare(password, user.password);
  
      if (!found) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

        // token
       let token
        try{

          token=jwt.sign({email:user.email},process.env.Key);
  
        }catch(err){
  
          res.send(err)
        }

        res.status(200).json({ email,token });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

  
  export {addUser,loginUser}
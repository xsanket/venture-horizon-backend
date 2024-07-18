import express from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';


const router = express.Router();


router.post('/registration', async (req, res) => {
    try {
        const { email, password } = req.body;

        //hashed the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //new instance after password hashing
        const user = new userModel({ email, password: hashedPassword });

        //check user exist or not
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            });
        }

        //Save new user in db
        const saveUser = await user.save();

        res.status(201).json({
            success: true,
            message: "user registered successfully",
            data: saveUser
        });


    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error"
        });

    }


});

export default router;



/*****************************
http://localhost:5000/api/registration

http://localhost:5000/api/login

 test route 
{
  "email": "test@example.com",
  "password": "password123"
}

*/

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require("cors");
const bcrypt = require('bcryptjs'); // Don't forget to require 'bcrypt'!
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json()); // This will parse JSON request bodies
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("<h2 align=center>Welcome to the session</h2>");
});

app.post('/register', async (req, res) => { // Add async here
    const { Name, Email, Password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(Password, 10); // Add async here
        const user = new User({ Name, Email, Password: hashedPassword });
        await user.save();
        res.json({ message: "User Registered..." });
        console.log("User Registration is Completed");
    } catch (err) {
        console.log(err);
    }
});

app.post('/login', async (req, res)=>{
    const {Email,Password}=req.body
    try{
        const user = await User.findOne({Email});
        if(!user || (await bcrypt.compare(Password,user.Password)))
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }
        res.json({message:"login Successfully",Name:User.Name });

    }
    catch(err)
    {
        console.log(err)

    }
})

mongoose.connect("mongodb+srv://demomongodb123:demomongodb123@cluster0.xwc24.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("DB connected successfully...");
    })
    .catch((err) => console.log(err));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error");
    }
    console.log("Server is Running on port", +PORT);
});







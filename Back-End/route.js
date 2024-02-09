const express = require('express')
const  mongoose  = require('mongoose')
const router = express.Router()
require('dotenv').config()
const {User,Data} =require('./model')
// app.use(express.json())

//get user


router.get('/read',async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users);
    }
    catch (err){
        res.status(500).json({message : err.message})
    }
})
//get data
router.get('/data',async (req,res)=>{
    try{
        const datas = await Data.find()
        res.json(datas);
    }
    catch (err){
        res.status(500).json({message : err.message})
    }
})

//post data
router.post('/info', async (req, res) => {
    try {
        const { incidentID, dateTime, location, suspectInformation } = req.body;
        const newData = new Data({
            incidentID,
            dateTime,
            location,
            suspectInformation
        });
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//post user
router.post('/user', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete user
router.delete('/delete/:id',async (req,res)=>{
    try {
       const user = await User.findByIdAndDelete(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({message:"Item deleted successfully"})
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})
//delete data
router.delete('/d-delete/:id',async (req,res)=>{
    try {
       const user = await Data.findByIdAndDelete(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({message:"Item deleted successfully"})
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})
//edit user
router.put('/update/:id',async (req,res)=>{
    try {
         
       const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
       console.log(user)
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({message:"Item updated successfully"})
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})


//edit data
router.put('/d-update/:id',async (req,res)=>{
    try {
         
       const user = await Data.findByIdAndUpdate(req.params.id,req.body,{new:true});
       console.log(user)
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({message:"Item updated successfully"})
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})
module.exports=router
const express = require('express');
const router = express.Router();
const AuthModal = require('../models/auth');
const { route } = require('./accountRoute');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerValidator = (data) => {
    const rule = Joi.object({
        name: Joi.string().min(6).max(225).required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

router.post('/login',async (req,res,next)=>{
    const email = req.body.email;
    const passWord = req.body.password;
    const user = await AuthModal.findOne({email:email});
    if(!user){ 
        return res.status(422).send('Không tìm thấy email')
    }else{
        if(user.password == passWord){
            const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET?process.env.TOKEN_SECRET:'somethingRandom', { expiresIn: 60 * 60 * 24 });
            res.header('auth-token',token).send({status:'s',token:token})
        }else{
            return res.status(422).send('Mật khẩu đăng nhập sai.');
        }
    };
    

})
router.post('/register', async (req,res,next)=>{
    const { error } = registerValidator(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const checkEmailExit = await AuthModal.findOne({email:req.body.email});
    if(checkEmailExit) return res.status(422).send('Email đã tồn tại.');
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new AuthModal({
        name:req.body.name,
        email:req.body.email,
        password: hashPassword
    })
    try {
        const newUser = await  user.save();
        res.send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;
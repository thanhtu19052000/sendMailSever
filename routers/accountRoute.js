const express = require('express');
const router = express.Router();
const verifiedTokenMid  = require('../middlewares/verifyToken.js')
const AccountModal = require('../models/account')


router.get('/',verifiedTokenMid,(req,res,next)=>{
    const pageSize = req.query.pageSize;
    const indexPage = req.query.indexPage
    AccountModal.find({})
    .skip((indexPage-1)*pageSize)
    .limit(pageSize)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Fail connect Server')
    })
});
router.get('/:id',verifiedTokenMid,(req,res,next)=>{
    AccountModal.findOne({_id:req.params.id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Fail connect Server')
    })
});
router.post('/',verifiedTokenMid,(req,res,next)=>{
    const username = req.body.username;
    const passwords = req.body.password
    AccountModal.findOne({username:req.body.username})
    .then(data=>{
        if(data){
            res.json('User ton tai')
        }else{
            return AccountModal.create({
                username:username,
                passwords:passwords,
            })
        }
    })
    .then(data=>{
        res.json('Tao thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Fail connect Server')
    })

});
router.put('/',verifiedTokenMid,(req,res,next)=>{
    const username = req.body.username;
    const passwords = req.body.passwords;
    AccountModal.findOneAndUpdate({username:username},{
        passwords:passwords,
    })
    .then(data=>{
        res.json('Update thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Fail connect Server')
    })
});
router.delete('/:id',verifiedTokenMid,(req,res,next)=>{
    AccountModal.findOneAndDelete({_id:req.params.id})
    .then(data=>{
        res.json('Delete thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Fail connect Server')
    })
});

module.exports = router;
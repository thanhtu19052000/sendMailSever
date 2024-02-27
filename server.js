const express = require('express');
const app = express();

const TestRouter = require('./routers/testRoute')
const dotenv = require('dotenv');


dotenv.config();

// parse application/json

app.use('/sendMail', TestRouter)

app.get('/', (req, res, next) => {
    res.json('home');
})
// app.post('/login',(req,res,next)=>{
//     const username =  req.body.username;
//     const password =  req.body.password;
//     AccountModal.findOne({
//         username:username,
//         passwords:password,
//     }).then(data=>{
//         if(data){
//             res.json('login success')
//         }else{
//             res.json('login fail')
//         }
//     }).catch(err=>{
//         res.status('500').json('Loi he thong')
//     })
// })
// app.post('/register',(req,res,next)=>{
//     const username =  req.body.username;
//     const password =  req.body.password;
//     AccountModal.findOne({
//         username:username
//     }).then(data=>{
//         if(data){
//             res.json('Ton tai user');
//         }else{
//             return AccountModal.create({
//                 username:username,
//                 passwords:password,
//             })
//         }
//     }).then(data=>{
//         res.json('tao acc thanh cong')
//     }).catch(err=>{
//         res.status('500').json('Loi he thong')
//     })
// })







const PORT = process.env.PROT || 4000;
app.listen(PORT, () => {
    console.log('server start on port ', PORT);
})
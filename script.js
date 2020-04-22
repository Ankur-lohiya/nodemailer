const express=require('express');
const nodemailer=require('nodemailer');
const path=require('path');
const bodyParser=require('body-parser')
var app=express();
app.set('views',path.join(__dirname,'jade'));
app.set('view engine','jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'css')))
app.get('/login',(req,res)=>{
    res.render('login');
});
app.post('/login/send',(req,res)=>{
    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'ankurlohiya3@gmail.com',
            pass:'@Ankur1401'
        }
    });
    var mailOptions={
        from:'Deepankur Lohiya<ankurlohiya3@gmail.com>',
        to:`${req.body.EMAIL}`,
        subject:'Confirmation Email',
        text:'You have been sucessfully registered with us',
        html:`<ul><li>Name:${req.body.NAME}</li><li>Mobile No.:${req.body.CONTACT}</li><li>Profile:${req.body.PROFILE}</li></ul>`
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
            res.redirect('/login');
        }
        else{
            console.log(`Mail Sent at ${req.body.EMAIL}`);
        }
    });
    console.log(req.body.NAME);
});
app.listen(5000);
console.log(`listening on port 5000`);
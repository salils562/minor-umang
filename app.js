require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const port = process.env.PORT;
// creating connection
mongoose.connect("mongodb://localhost:27017/maheshData", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connection succesfull");
}).catch((err) => {
    console.log("Unable to connect");
});
// paths
const staticpath = path.join(__dirname, "/public");
const partialpath = path.join(__dirname, "/partials");
hbs.registerPartials(partialpath);// using in app
app.set('view engine', 'hbs');
app.use(express.static(staticpath));
app.set("views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
// creating schemas
const maheshSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const employeeSchema = new mongoose.Schema({
    employeename: {
        type: String,
        required: true
    },
    employeeid: {
        type: Number,
        unique:true,
        required: true
    },
    employeedept: {
        type: String,
        required: true
    },
    employedesign: {
        type: String,
        required: true
    },
    employeecompany: {
        type: String,
        required: true
    },
    basicpay: {
        type: Number,
        required: true
    },
    netpay: {
        type: Number,
        required: true
    },
    hra: {
        type: Number,
        required: true
    },
    da: {
        type: Number,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    incometax: {
        type: Number,
        required: true
    },
    gis: {
        type: Number,
        required: true
    },
    pt: {
        type: Number,
        required: true
    }
});

// collection creation 
const idData = new mongoose.model("idpass", maheshSchema);
const employeeData=new mongoose.model("employeData",employeeSchema);
// get requests
router.get("/", (req, res) => {
    res.status(200).render("login");
});

router.get("/empdetail",(req,res)=>{
res.status(200).render("seeDetails");
});
// hadling get request
router.get('/Employeedetails',async(req,res)=>{
try{
const data=await employeeData.find();
res.send(data);
}catch(e){
res.send("unable to fetch data");
}
});

// handling post request
router.post('/Login', async (req, res) => {
    try {
        let Username = req.body.username;
        let Password = req.body.password;
        const result = await idData.find({ username: Username });
        if (Password == result[0].password) {
            res.status(200).render('fillsalary');
        }
    } catch (e) {
        res.status(404).render("404");
    }
});
//post requests
router.post('/postDetails', async (req, res) => {
    try {
      const empDetail=new employeeData({
       employeename:req.body.employeename,
       employeeid:req.body.employeeid,
       employeedept:req.body.employeedept,
       employedesign:req.body.employeedesig,
       employeecompany:req.body.employeecmp,
       basicpay:req.body.basicpay,
       netpay:req.body.netsal,
       hra:req.body.hra,
       da:req.body.da,
       cpf:req.body.cpf,
       gis:req.body.gis,
       pt:req.body.pt,
       incometax:req.body.it
      });
      const result=await empDetail.save();
      res.send(result);
    } catch (e) {
      res.status(404).render('404');
    }
});
router.get("*", (req, res) => {
    res.render("404", { errorMsg: "Sorry page not found" });
});
// listening on port
app.listen(port, () => {
    console.log(`listening on port ${process.env.LOCALHOST}:${port}`);
});

const express = require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser');
const {connection, mysql} = require('../db/sql')

const router = new express.Router()

router.post('/adminlogin',(req,res)=>{
    if(req.body.admin_id==="admin" && req.body.password==="pass"){
      res.redirect("/admindashboard");
    }
    else{
      res.status(401).json({ error: 'Incorrect id or password' });
    }
  });
  module.exports = router
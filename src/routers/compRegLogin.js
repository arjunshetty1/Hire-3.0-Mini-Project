const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path=require('path');
const bodyParser = require('body-parser');
const {connection, mysql, query} = require('../db/sql');

const router = new express.Router()

router.post('/comp-register', async (req, res) => {
    // retrieve user input from request body
    const COMPANY = req.body;
     console.log(COMPANY)
  
    //generate hash for password
    const salt=bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(COMPANY.password, salt);
    // execute query
    connection.query(`INSERT INTO company (CompanyName, Requirements, Website, CEmail, Phone, CSkills, Package, Password) values('${COMPANY.name}','${COMPANY.requirements}', '${COMPANY.website}', '${COMPANY.email}', '${COMPANY.phone}','${COMPANY.skills}','${COMPANY.package}' , '${hash}')`, (error, result, fs) => {
       if (error) {
  
         console.error(error);
         if (error.errno === 1062) {
          return res.status(406).send({
              "message": "The entered email is already registered"
          })
      }
        return res.status(500).json({ error: 'Error executing INSERT query' });
   
      }
      res.redirect("/signincomp");
    });
  });
  
router.get("/approve-comp", async(req, res)=> {
  let approve = req.query.approve;
  let email = req.query.email;
  approve = parseInt(approve);
  await query(`UPDATE company SET approved=${approve} WHERE CEmail='${email}'`);
  res.status(200);

})
router.post('/signincomp', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    connection.query(`SELECT * FROM company WHERE CEmail = '${email}'`,[email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error executing SELECT query' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'No such user exists' });
      }
      const approved = parseInt(results[0].approved);
      if(!approved) {
        console.log(approved);
        return res.redirect("/signincomp?unauth=1");}
      const match = await bcrypt.compare(password, results[0].Password);
      if (match) {
          req.session.email = email;
          res.redirect(`/compdashboard?cname=${results[0].CompanyName}`);
      } else {
        res.status(401).json({ error: 'Incorrect email or password' });
      }
    });
  });
  
module.exports = router
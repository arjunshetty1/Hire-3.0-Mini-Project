const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path=require('path');
const bodyParser = require('body-parser');
const {connection, mysql} = require('../db/sql')

const router = new express.Router()

router.post('/devreg', async (req, res) => {
    // retrieve user input from request body
    const developer = req.body;
     console.log(developer)
  
    //generate hash for password
    const encryptedPassword = await bcrypt.hash(developer.password, 8)
    // execute query
    connection.query(`INSERT INTO developers (Dname, Email, Phone, LinkedIn, Github, Education, Skills, Experience, Availability, Location, Password,path) values('${developer.name}','${developer.email}', ${developer.phone}, '${developer.linkedin}', '${developer.github}','${developer.education}' , '${developer.skills}', ${developer.years}, '${developer.availability}', '${developer.location}','${encryptedPassword}','${developer.resume}')`, (error, result, fs) => {
      if (error) {
        console.error(error);
        if (error.errno === 1062) {
          return res.status(406).send({
            "message": "The entered email is already registered"
          })
        }
        return res.status(500).json({ error: 'Error executing INSERT query' });
   
      }
      res.redirect("/pretest");
    });
  });
  
router.post('/signindev', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    connection.query(`SELECT * FROM developers WHERE Email = '${email}'`,[email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error executing SELECT query' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'No such user exists' });
      }
      const match = await bcrypt.compare(password, results[0].Password);
      if (match) {
          req.session.email = email;
          res.redirect("/devdashboard");
      } else {
        res.status(401).json({ error: 'Incorrect email or password' });
      }
    });
  });

module.exports = router
  
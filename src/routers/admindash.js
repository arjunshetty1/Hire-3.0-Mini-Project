const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const {query} = require('../db/sql');
const { connect } = require('http2');
const router = new express.Router();

router.get('/admindashboard', async (request, response, next) => {
    try {
        const query1 = `SELECT CompanyName, Website, CEmail, Phone FROM company where approved=0`;
        const query2 = `SELECT DName, Email, Phone FROM developers where Email NOT IN(SELECT DEmail from shortlisted)`;
        const data1 = await query(query1);
        const data2 = await query(query2).catch(err => console.log(err));
        response.render("layouts/admindevdash", { companies: data1, developers: data2  });
    } catch (error) {
        throw error;
    }   
});

router.get('/forwardapplicant', async(req, res)=> {
    const cname = req.query.cname;
    const demail = req.query.demail;
    console.log(req.query)
    query(`INSERT INTO shortlisted VALUES('${cname}', '${demail}')`).catch(err => console.log(err));
    res.status(200);
})
module.exports = router;
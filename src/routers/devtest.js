const express = require('express');
const app = express();

const path=require('path');
const bodyParser = require('body-parser');
const {connection, mysql} = require('../db/sql')

const router = new express.Router()

router.post('/test',(req,res)=>{
    const sql = `INSERT INTO test (Score, DevID) VALUES (${score}, ${DevID}) `;
connection.query(sql, function (error, results, fields) {
  if (error) throw error;                                                              
  console.log('Score stored in the database.');
});
})

module.exports = router
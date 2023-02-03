const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path=require('path');
const bodyParser = require('body-parser');
const session=require('express-session');
const {query} = require("./src/db/sql");

// parse incoming request bodies in a middleware before your handlers
app.use(express.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


const dev=require('./src/routers/devRegLogin')
const comp=require('./src/routers/compRegLogin')
const admin=require('./src/routers/adminLogin')
const admindash=require('./src/routers/admindash')
const test=require('./src/routers/devtest')


app.use(dev)
app.use(comp)
app.use(admin)
app.use(admindash)
app.use(test)

app.get( '/' , (req,res)=>{
        res.sendFile(path.join(__dirname, './public/html/index.html'));
    }
)


app.get('/developer' , (req,res)=>{
        res.sendFile(path.join(__dirname, './public/html/dev.html'));
    }
)


app.get('/comp-register', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/com.html'));
})


app.get('/compdashboard', async(req, res)=>{
    const cname = req.query.cname;
    const sql = `SELECT * FROM developers, shortlisted WHERE Email=DEmail and Cname='${cname}';`;
    const developers = await query(sql)
    res.render('layouts/compdash.hbs', {developers});
})


app.get('/devreg', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/devreg.html'));
})


app.get('/test', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/devtest.html'));
})


app.get('/signindev', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/signindev.html'));
})


// app.get('/admindashboard', (req, res)=>{
//     res.sendFile(path.join(__dirname, './views/layouts/admindevdash.hbs'));
// })


app.get('/pretest', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/pretest.html'));
})


app.get('/process', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/pro.html'));
})


app.get('/contact', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/cont.html'));
})


app.get('/signincomp', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/signincomp.html'));
})


app.get('/devdashboard', (req, res)=>{
    res.render('layouts/devdash')
})



app.get('/adminlogin', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/adminlogin.html'));
})


app.get('/logout', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/html/logout.html'));
})

// app.get('/*', (req, res) => {
//   //console.log(req.path);
//   switch (req.path) {
//       case '/':
//           break;
//       case '/developer':
//           res.sendFile(path.join(__dirname, './public/html/dev.html'));
//           break;
//       case '/comp-register':
//           res.sendFile(path.join(__dirname, './public/html/com.html'));
//           break;
//       case '/compdashboard':
//           res.sendFile(path.join(__dirname, './views/layouts/compdash.html'));
//           break;
//       case '/devreg':
//           res.sendFile(path.join(__dirname, './public/html/devreg.html'));
//           break;
//       case '/test':
//           res.sendFile(path.join(__dirname, './public/html/devtest.html'));
//           break;
//       case '/signindev':
//           res.sendFile(path.join(__dirname, './public/html/signindev.html'));
//           break;
//       case '/admindashboard':
//           res.sendFile(path.join(__dirname, './views/layouts/admindevdash.hbs'));
//           break;
//       case '/pretest':
//           res.sendFile(path.join(__dirname, './public/html/pretest.html'));
//           break;
//       case '/process':
//           res.sendFile(path.join(__dirname, './public/html/pro.html'));
//           break;
//       case '/contact':
//           res.sendFile(path.join(__dirname, './public/html/cont.html'));
//           break;
//       case '/signincomp':
//           res.sendFile(path.join(__dirname, './public/html/signincomp.html'));
//           break;
//       case '/devdashboard':
//           res.sendFile(path.join(__dirname, './views/layouts/devdash.hbs'));
//           break;
//       case '/adminlogin':
//           res.sendFile(path.join(__dirname, './public/html/adminlogin.html'));
//           break;
//       case '/logout':
//           res.sendFile(path.join(__dirname, './public/html/logout.html'));
//           break;
//       default:
//           res.sendFile(path.join(__dirname, './public/html/404.html'));
//   }
// });


// start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

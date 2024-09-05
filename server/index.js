
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
 const session = require('express-session');

//connect to database
connectDB();



dotenv.config();
const PORT = process.env.PORT || 1321;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors())
app.use(cookieParser());

app.use(session({
  secret: process.env.secret_key, // This should be a secret key used to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set secure: true if your site is served over HTTPS
}));






//middleware:  to clear cache in website
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:1321');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });



app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.resolve(__dirname, 'views'));


const willifyRouter = require('./routes/routes')


app.use('/batuk', willifyRouter);




// // // Handle 404 errors
// app.use((req, res, next) => {
//  return res.status(404).render('404');
// });


// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//  return res.status(500).render('500', {
//     header: 'header', 
//     footer: 'footer', 
//     sideMenu: 'sideMenu',
//   })
// });




app.get('/', (req, res)=>{
  res.render("home")
  
  })










app.listen(PORT, console.log("server started at port:", PORT));



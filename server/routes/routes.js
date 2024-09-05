
const express = require('express');
const {aboutMe, getDetails} = require('../controllers/willify.controller.js');
const userRoute = express.Router();
const fs = require('fs')
const path = require('path')


userRoute.post('/aboutMe', aboutMe); 
userRoute.get('/getDetails', getDetails); 

  

module.exports = userRoute;

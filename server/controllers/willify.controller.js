
const userWillifyModel = require('../models/userWillify.models')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
// const puppeteer = require('puppeteer');
const ejs = require('ejs');

async function aboutMe(req, res) {

var {willify_id} = req.query;

console.log("req.query", req.query);


    var data = req.body;

    try {

        if(willify_id){
            var user = await userWillifyModel.findOneAndUpdate({ willify_id}, data, {new: true});

            // console.log('user in update before save', user);


            // user = {...user, ...data}
            // await user.save();
            console.log('user in update', user);

        }
        else{
        const willify_id = uuidv4().slice(0, 30);
        var user = await userWillifyModel.create({ willify_id, ...data });
        console.log("user in create", user);
    }


        if (user) {
            res.cookie('willify_id', willify_id);
            return res.status(200).json(user)
        }

       
    }
    catch (error) {
        console.error('Error in aboutMe:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}




async function getDetails(req, res) {


    var willify_id = req.query.willify_id
    console.log('willify_id', willify_id)
    

    try {
        const user = await userWillifyModel.findOne({ willify_id });

        console.log('user', user);

        if (user) {
            const newUser= user.toObject();

            
    function calculateAge(dob) {
        const currentDate = new Date();
        const birthDate = new Date(dob);
  
        // Calculate the difference in years
        let age = currentDate.getFullYear() - birthDate.getFullYear();
  
        // Check if the current date hasn't reached the birth month and day yet
        if (
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
        ) {
          age--;
        }
  
        return age;
      }
  
      const ageCaclulated = calculateAge(newUser.dob);
      console.log("Age:", ageCaclulated);
      newUser.age = ageCaclulated;
     
  
      function calculateDate(dateString) {
        const date = new Date(dateString);
  
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
  
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dayOfWeekIndex = date.getDay();
        const weekDay = daysOfWeek[dayOfWeekIndex];
        const formatDate = `${day}-${month}-${year}`;
        
      newUser.formatDate = formatDate;
      newUser.weekDay = weekDay;

      }
  
      calculateDate(newUser.updatedAt);


                 return res.status(200).json(newUser);
        }
        else {
            return res.json("no user found")
        }
    }

    catch (error) {
        console.error('Error in getDetails:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}




module.exports = {
    aboutMe,
    getDetails,
}
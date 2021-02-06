# This API is used to check user availability with different timezones.

# Use below steps to setup on your local machine

# Make sure you have [Node.js]

# For dummy data you can import dummy.sql file.

# Make sure you have [Node.js]

# Execute below commands one by one on your terminal:

git clone https://github.com/shivanijaiswal123/availability-check.git
cd cd availability-check
npm install
npm start

# API input format:

Base_URL = http://localhost:3000/api

# Endpoint : /availability

# Method : POST

parameters :
{
"userID": 1,  
"startTime": 1612512000000, # time in milliseconds
"endTime": 1612519200000 # time in milliseconds
}

# Endpoint : /availability

# Method : GET

# parameters in query:

userID : Pass the user id in integer
timeZone: Pass the required timezone values as 'HST' or 'Europe/Copenhagen' format.

# Example1 : http://localhost:3000/api/availability?userID=1&timeOffset=Europe/Copenhagen

# Example2 : http://localhost:3000/api/availability?userID=1&timeOffset=HST

# Here is the postman doc link : https://documenter.getpostman.com/view/9895048/TW74iQe4

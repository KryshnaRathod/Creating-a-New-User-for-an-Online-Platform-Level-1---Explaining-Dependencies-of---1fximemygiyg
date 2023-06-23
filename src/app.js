const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const userDetails = JSON.parse(
  fs.readFileSync(`${__dirname}/data/userDetails.json`)
);

//Middlewares
app.use(express.json());

// Write POST endpoint for registering new user
app.post('/api/v1/details', (req, res) => {
  // Extract user details from request body
  const { name, mail, number } = req.body;

  // Validate user data
  if (!name || !mail || !number) {
    return res.status(400).json({
      status: 'Error',
      message: 'Invalid user data'
    });
  }

  // Generate the ID for the new user
  const lastUser = userDetails[userDetails.length - 1];
  const newUserId = lastUser ? lastUser.id + 1 : 1;

  // Create the new user object
  const newUser = {
    id: newUserId,
    name: name,
    mail: mail,
    number: number
  };

  // Add the new user to the userDetails array
  userDetails.push(newUser);

  // Write the updated user details to the JSON file
  // (You can replace this step with your specific file handling code)
  // fs.writeFileSync('./data/userDetails.json', JSON.stringify(userDetails, null, 2));

  res.status(201).json({
    status: 'Success',
    message: 'User registered successfully',
    data: {
      newUser: newUser
    }
  });
});



 



// GET endpoint for sending the details of users
app.get("/api/v1/details", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Detail of users fetched successfully",
    data: {
      userDetails,
    },
  });
});

// GET endpoint for sending the products to client by id
app.get("/api/v1/userdetails/:id", (req, res) => {
  let { id } = req.params;
  id *= 1;
  const details = userDetails.find((details) => details.id === id);
  if (!details) {
    return res.status(404).send({
      status: "failed",
      message: "Product not found!",
    });
  } else {
    res.status(200).send({
      status: "success",
      message: "Details of users fetched successfully",
      data: {
        details,
      },
    });
  }
});

module.exports = app;

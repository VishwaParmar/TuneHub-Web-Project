const RequestValidator = require("../controllers/validators/user-request.validator");
const Users = require("../models/UserModel.js");
const uuid = require('uuid');
const bcrypt = require('bcrypt');


// API to get all users
exports.getUsers = async (req, res) => {
  try {
    if (!Users || !Users.length) {
      return res.status(404).json({ success: false, data: "No users found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
  return res.status(200).json({ message: "Users retrieved", success: true, users: Users });
}

// API to register new user
exports.registerUser = async (req, res) => {
  const body = req.body;
  const { id, email, firstName, lastName, password, userRole } = req.body;
  const isNewUserRequestBodyValid = RequestValidator.validateNewUserRequestBody(req.body);
  try {

    if (!isNewUserRequestBodyValid) {
      return res.status(400).json({ success: false, data: "Incorrect Request" });
    }
    // Salt for hashing
    const rounds = 8;
    const salt = await bcrypt.genSalt(rounds);

    // Hash using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({ id, email, firstName, lastName, password: hashedPassword, userRole });

    newUser.save()
      .then((savedUser) => {
        res.status(200).json({ success: true, message: 'User added.', user: savedUser });
      })
      .catch((err) => {
        console.error('Error saving user:', err);
        res.status(500).json({ success: false, message: 'Error saving user. Something went wrong.' });
      });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }

};

// API to login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await Users.findOne({ email});
  if (!user && !bcrypt.compare(password, user.password)) {
    return res.status(404).json({ success: false, data: "User not found!" });
  } else {
    return res.status(200).json({ success: true, user: user });
  }
};

// API to get a user by id
exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching user. Something went wrong.' });
  }

};

// API to edit a user
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedBody = req.body;
  const { firstName,
    lastName,
    dateOfBirth } = req.body;
  //const isNewUserRequestBodyValid = RequestValidator.validateNewUserRequestBody(req.body);
  try {
    if (firstName === null && lastName === null && dateOfBirth === null) {
      return res.status(400).json({ success: false, data: "Incorrect Request" });
    }
    const currentUser = await Users.findOne({ id: userId });
    if (!currentUser) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    /*   const updatedUser = await Users.findOneAndUpdate(
       { _id: userId },
       { updatedBody },
       { new: true }
       );*/

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.dateOfBirth = dateOfBirth;
    const updatedUser = await Users.updateOne(
      { id: userId },
      currentUser
    );

    res.status(200).json({ success: true, message: 'User updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating user. Something went wrong.' });
  }
};

// API to change password
exports.changePassword = async (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;
  try {
    if (password === null) {
      return res.status(400).json({ success: false, data: "Incorrect Request" });
    }
    const currentUser = await Users.findOne({ email: userId });
    if (!currentUser) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    currentUser.password = password;
    const updatedUser = await Users.updateOne(
      { email: userId },
      currentUser
    );
    res.status(200).json({ success: true, message: 'Password updated.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Error updating password. Something went wrong.' });
  }

}

// API to delete a user by id
exports.deleteUser = async function (req, res) {
  const userId = req.params.id;

  try {
    const user = await Users.findOne({ id: userId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    if (!(user instanceof Users)) {
      return res.status(500).json({ success: false, message: 'Invalid user data.' });
    }
    await Users.deleteOne({ id: userId });

    res.status(200).json({ success: true, message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting user. Something went wrong.' });
  }
};





const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

//Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { surname: "", firstname: "", email: "", password: "" };

  //incorrect email
  if (err.message === 'incorrect email'){
    errors.email = 'that email is not registered'
  }
 //incorrect password
 if (err.message === 'incorrect password'){
    errors.password = 'that password is incorrect'
  }
  //duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  //validation erros
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//create token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "lavish secret", {
    expiresIn: maxAge,
  });
};

const addUser = async (req, res) => {
  const { surname, firstname, email, password } = req.body;
  try {
    const user = await User.create({ surname, firstname, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};
const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors });
  }
};

const removeUser = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/')
}

module.exports = {
  addUser,
  getUser,
  removeUser
};

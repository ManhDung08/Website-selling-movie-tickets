import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { username, email, password, fullName, phone, dateOfBirth } = req.body;
  if (
    !username ||
    username.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === "" ||
    !fullName ||
    fullName.trim() === "" ||
    !phone ||
    phone.trim() === "" ||
    !dateOfBirth ||
    dateOfBirth.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hastedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({
      username,
      email,
      password: hastedPassword,
      fullName,
      phone,
      dateOfBirth,
    });
    user = await user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }
  return res.status(201).json({ user });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name ||
    name.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hastedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hastedPassword,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Update Succesfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Delete Succesfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res.status(200).json({ message: "Login Successfully" });
};

export const getTicketOfUser = async (req, res, next) => {
  const id = req.params.id;
  let tickets;
  try {
    tickets = await Ticket.find({ user: id });
  } catch (err) {
    return console.log(err);
  }
  if (!tickets) {
    return res.status(500).json({ message: "Unable to Get Booking" });
  }
  return res.status(200).json({ tickets });
};

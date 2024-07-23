const asyncHandle = require("express-async-handler");
const User = require("../Model/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandle(async (req, res) => {
  const { name, email, password, gender, pic } = req.body;

  if (!name || !email || !password || !gender) {
    res.status(400);
    throw new Error("please Enter all the fields");
  }

  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("user already exits");
  }

  const user = await User.create({
    name,
    email,
    password,
    gender,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("failed to create new user try agina later");
  }
});

const authUser = asyncHandle(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});

const allusers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const searchLower = search.toLowerCase();

    const users = await User.find(
      {
        name: searchLower,
      },
      "name email _id pic"
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

module.exports = { registerUser, authUser, allusers };

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const defaultImages = {
  male: [
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/mqrt2vsiu0rks9gxz0if.png",
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/murqweh6j35pscp7hkml.png",
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/dbttvdwylxks6hxgybkx.png",
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/kl2kpiuyhv9z5gbvp111.png",
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/q5kryu8iz6bvkrzsip2d.png",
  ],
  female: [
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824770/itsxq0yas1cenufuw98r.png",
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824770/pvkf4a9tm0xvztam6hfb.png",
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824770/secgm06q6ezgst91y8xf.png",
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/rasjqugnoa9doxr7t3av.png",
    "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/jrq9ngwsmnfpvxfuxs1m.png",
  ],
};

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], require: true },
    pic: {
      type: String,
      default: function () {
        // Get the array of image paths based on the user's gender
        const images = defaultImages[this.gender];
        // Select a random image path from the array
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
      },
    },
  },
  { timestamp: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;

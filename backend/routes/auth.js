// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();
// Gelen verileri import edebilmem için sağlayıcı kaynak lazım.
const bcrypt = require("bcryptjs");
const User = require("../../backend/modals/User");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

// Kullanıcı Oluşturma ( Create - Register) auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("Already Exist"); // Hata döndürdükten sonra işlemi sonlandır.
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      avatar: generateRandomAvatar(),
    }); // Burada "password" alanını kullanmalısınız.
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});

router.get("/register", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});

// Kullanıcı Girişi (Login) auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Invalid E-Mail");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid Password");
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      password: user.password,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});

router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//export etmemiz gerekli!
module.exports = router;

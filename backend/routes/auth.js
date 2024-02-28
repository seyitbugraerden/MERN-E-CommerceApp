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

// Kullanıcı Oluşturma ( Create - Register)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json("Already Exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      role,
      avatar: generateRandomAvatar(),
    }); // Burada "password" alanını kullanmalısınız.
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});

// Kullanıcı Girişi (Login)

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Invalid E-Mail");
    }
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});

//export etmemiz gerekli!
module.exports = router;

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/lostandfound";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) =>
    console.error("Error connecting to MongoDB:", err.message)
  );


// ================= USER SCHEMA =================
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String, required: true },
  regNumber: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);


// ================= ITEM SCHEMA =================
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
   dateLost: String,
  type: String, 
});

const Item = mongoose.model("Item", itemSchema);


// SIGNUP 
app.post("/signup", async (req, res) => {
  try {
    const { username, email, userType, regNumber, phone, password } = req.body;

    if (!username || !email || !userType || !regNumber || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // VALIDATION
    if (!/^\d{6}$/.test(regNumber)) {
      return res.status(400).json({
        message: "Registration number must be exactly 6 digits",
      });
    }

    if (!/^(07|01)\d{8}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone must be 10 digits and start with 07 or 01",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already taken",
      });
    }

    const newUser = new User({
      username,
      email,
      userType,
      regNumber,
      phone,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful" });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= REPORT LOST ITEM =================
app.post("/report", async (req, res) => {
  try {
    const { itemName, description, location, dateLost } = req.body;

    if (!itemName || !description || !location || !dateLost) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({
       name: itemName,
      description,
      location,
      dateLost,
      type: "lost", 
    });

    await newItem.save();

    res.status(201).json({ message: "Item reported successfully" });

  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/report-found", async (req, res) => {
  try {
    const { name, description, location } = req.body;

    if (!name || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({
      name,
      description,
      location,
      type: "found",
    });

    await newItem.save();

    res.status(201).json({ message: "Item reported successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    const items = await Item.find({
      name: { $regex: query, $options: "i" },
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error searching items" });
  }
});
// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
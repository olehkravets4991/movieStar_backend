////////////////////////////
// IMPORT OUR DEPENDENCIES
////////////////////////////
// read our .env file and create environmental variables
require("dotenv").config();
// pull PORT from .env, give default value
// const PORT = process.env.PORT || 8000
// const DATABASE_URL = process.env.DATABASE_URL
const { PORT = 8000, DATABASE_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import cors
const cors = require("cors");
// import morgan
const morgan = require("morgan");
// import cookie parser
const cookieParser = require("cookie-parser");
// import bcrypt  
const bcrypt = require("bcryptjs")
// import jwt
const jwt = require("jsonwebtoken")

///////////////////////////
// DATABASE CONNECTION
///////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL);

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

////////////////////////////
// Models
////////////////////////////
// USER model for logged in users

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {type: String, required: true},
});

const User = mongoose.model("User", UserSchema);


const moviesSchema = new mongoose.Schema({
  title: String,
  poster: String,
  genres: String,
  releaseDate: String,
  username: String
});

const Movies = mongoose.model("Movies", moviesSchema);

////////////////////////////////
// Custom Auth Middleware Function
////////////////////////////////
async function authCheck(req, res, next){
  // check if the request has a cookie
  if(req.cookies.token){
    // if there is a cookie, try to decode it
    const payload = await jwt.verify(req.cookies.token, process.env.SECRET)
    // store the payload in the request
    req.payload = payload;
    // move on to the next piece of middleware
    next();
  } else {
    // if there is no cookie, return an error
    res.status(400).json({ error: "You are not authorized" });
  }
}

//////////////////////////////
// Middleware
//////////////////////////////
// cors for preventing cors errors (allows all requests from other origins)
if (process.env.NODE_ENV === "production"){
    app.use(
        cors({
          origin: "http://localhost:3000",
          credentials: true,
        })
      );
}else{
    app.use(
        cors({
          origin: "http://localhost:3000",
          credentials: true,
        })
      );
}
// app.use(cors());

// morgan for logging requests
app.use(morgan("dev"));
// express functionality to recognize incoming request objects as JSON objects
app.use(express.json());
// cookie parser for reading cookies (needed for auth)
app.use(cookieParser());

////////////////////////////
// ROUTES
////////////////////////////


// INDEX - GET - /movies - gets all people
app.get("/movies", authCheck, async (req, res) => {
  try {
    const movies = await Movies.find({username: req.payload.username});
    res.json(movies);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// CREATE - POST - /movies - create a new person
app.post("/movies", authCheck, async (req, res) => {
  try {
    req.body.username = req.payload.username;
    const movie = await Movies.create(req.body);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// SHOW - GET - /people/:id - get a single person
app.get("/movies/:id", authCheck, async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// UPDATE - PUT - /people/:id - update a single person
app.put("/movies/:id", authCheck, async (req, res) => {
  try {
    const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// DESTROY - DELETE - /people/:id - delete a single person
app.delete("/movies/:id", authCheck, async (req, res) => {
  try {
    const movie = await Movies.findByIdAndDelete(req.params.id);
    res.status(204).json(movie);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// create a test route
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

//////////////////
// AUTH ROUTES
//////////////////

// /signup - POST - receives a username and password and creates a user in the database
app.post("/signup", async (req, res) => {
  try {
    // deconstruct the username and password from the body
    let { username, password } = req.body;
    // hash the password
    password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    // create a new user in the database
    const user = await User.create({ username, password });
    // send the new user as json
    res.json(user);
  } catch(error){
    res.status(400).json({error})
  }
})

// /login - POST - receives a username and password, checks them against the database, and returns the user object if they match with a cookie inlcuding a signed JWT
app.post("/login", async (req, res) => {
  try {
    // deconstruct the username and password from the body
    const { username, password } = req.body;
    // search the database for a user with the provided username
    const user = await User.findOne({ username });
    console.log(user)
    // if no user is found, return an error
    if (!user) {
      throw new Error("No user with that username found");
    }
    // if a user is found, let's compare the provided password with the password on the user object
    console.log(password, user)
    const passwordCheck = await bcrypt.compare(password, user.password);
    // if the passwords don't match, return an error
    if (!passwordCheck) {
      throw new Error("Password does not match");
    }
    // create a token with the username in the payload
    const token = jwt.sign({ username: user.username }, process.env.SECRET);
    // send a response with a cooke that includes the token
    // res.cookie("token", token);
    if(process.env.NODE_ENV === "production"){
        res.cookie("token", token, {
            // can only be accessed by server requests
            httpOnly: true,
            // path = where the cookie is valid
            path: "/",
            // domain = what domain the cookie is valid on
            domain: "localhost",
            // secure = only send cookie over https
            secure: true,
            // sameSite = only send cookie if the request is coming from the same origin
            sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
            // maxAge = how long the cookie is valid for in milliseconds
            maxAge: 3600000, // 1 hour
          });
    }else{
        res.cookie("token", token, {
            // can only be accessed by server requests
            httpOnly: true,
            // path = where the cookie is valid
            path: "/",
            // domain = what domain the cookie is valid on
            domain: "localhost",
            // secure = only send cookie over https
            secure: false,
            // sameSite = only send cookie if the request is coming from the same origin
            sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
            // maxAge = how long the cookie is valid for in milliseconds
            maxAge: 3600000, // 1 hour
          });
    }
    // send the user as json
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get /cookietest to test our cookie
app.get("/cookietest", (req, res) => {
  res.json(req.cookies);
})

// GET /logout to clear our cookie
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "You have been logged out" });
})

////////////////////////////
// LISTENER
////////////////////////////
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
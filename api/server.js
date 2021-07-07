// BUILD YOUR SERVER HERE

//imports
const express = require("express");
const User = require("./users/model");

//express instance & middleware

const app = express();
app.use(express.json());

//Endpoints

// GET	/api/users	Returns an array users.

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(500).json({
      message: "The users information could not be retrieved",
    });
  }
  res.json(users);
});

// GET	/api/users/:id	Returns the user object with the specified id.
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      message: "The user with the specified ID does not exist",
    });
  }
  res.json(user);
});
// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user
app.put("/api/users:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      message: "The user with the specified ID does not exist",
    });
  }
  const userData = req.body;
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  }
  const revisedUser = User.update(id, userData);

  if (!revisedUser) {
    return res.status(500).json({
      message: "The user information could not be modified",
    });
  }
  res.status(200).json(revisedUser);
});
// POST	/api/users	Creates a user using the information sent inside the request body.
app.post("/api/users", async (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  }

  const userData = req.body;
  const newUser = await User.insert(userData);
  if (!newUser) {
    return res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
  res.status(201).json(newUser);
});
//DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
app.delete("/api/users", (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      message: "The user with the specified ID does not exist",
    });
  }
  const deletedUser = User.remove(id);
  if (!deletedUser) {
    return res.status(500).json({
      message: "The user could not be removed",
    });
  }
  res.status(200).json(deletedUser);
});

module.exports = app; // EXPORT YOUR SERVER instead of {}

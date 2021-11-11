const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UsersModel = require("./users.model");
const middleware = require("../../lib/middleware/middleware");

// fetch all
router.get("/", async function(req, res, next) {  
  try {
    let result = await middleware.getAll(UsersModel, {}, req.query);
    res.send({
      data: result,
      message: "Users fetched successfully",
      status: "Success"
    });
  } catch (error) {
    res.status(409).send({ err: error, status: "Failure" });
  }
});

// fetch by id
router.get("/:id", async function(req, res, next) {
  try {
    let result = await middleware.getById(UsersModel, mongoose.Types.ObjectId(req.params.id));
    res.send({
      data: result,
      message: "User fetched successfully",
      status: "Success"
    });
  } catch (error) {
    res.status(409).send({ err: error, status: "Failure" });
  }
});

// insert a record
router.post("/", async function(req, res, next) {
  try {
    let result = await middleware.create(UsersModel, req.body);
    res.send({
      data: result,
      message: "User saved successfully",
      status: "Success"
    });
  } catch (error) {
    res.status(409).send({ err: error, status: "Failure" });
  }
});

// update a record
router.patch("/:id", async function(req, res, next) {
  try {
    let result = await middleware.update(
      UsersModel,
      { _id: mongoose.Types.ObjectId(req.params.id) },
      req.body
    );
    res.send({
      data: result,
      message: "User updated successfully",
      status: "Success"
    });
  } catch (error) {
    res.status(409).send({ err: error, status: "Failure" });
  }
});

module.exports = router;

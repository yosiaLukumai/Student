const userModel = require("../models/users");
const createOutput = require("../utils").createOutput;
const utils = require("../utils");
// const io = require("./../sockets").get()
const Socket = require("../index")
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // query a user from the database
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatched = await utils.comparePassword(
        password,
        user.password
      );
      if (passwordMatched) {
        return res.json(createOutput(true, { user }));
      } else {
        return res.json(createOutput(false, "Incorrect Password"));
      }
    } else {
      return res.json(createOutput(false, user));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const saved = await userModel.create({
      email,
      password,
    });
    if (saved) {
      return res.json(createOutput(true, saved));
    } else {
      return res.json(createOutput(false, saved));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json(createOutput(true, users));
  } catch (error) {
    return res.json(false, error.message, true);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // querying the user in the database
    const user = await userModel.findById(id);
    const { email, classLevel, role, permission } = req.body;
    if (user) {
      const updated = await userModel.updateOne(
        { email: user.email },
        { email, classLevel, role,permission }
      );

      if (updated) {
        const userUpdated = await userModel.findById(id)
        return res.json(createOutput(true, userUpdated));
      } else {
        return res.json(createOutput(true, "failed to update the user"));
      }
    }
    return res.json(createOutput(false, "failed to get user with given id"));
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};



const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userModel.deleteOne({ _id: id });
    if (deleted) {
      return res.json(createOutput(true, deleted));
    } else {
      return res.json(createOutput(false, deleted));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};





const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      return res.json(createOutput(true, user));
    } else {
      return res.json(createOutput(true, "No such user"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};


const changePermission = async (req, res) => {
  try {
    const id = req.params.monitorId;
    const user = await userModel.findById(id);
    // console.log(user);
    if (user) {
      const permission = req.params.permission
      if(typeof Boolean(permission) === "boolean" && user.role == "monitor") {
        // check if user exists 
        const userId = req.params.userId;
        const userExist = await userModel.findById(userId)
        if(userExist) {
          const updateds = await userModel.updateOne({_id:userId}, {permission})
          if(updateds) {
          return res.json(createOutput(true, updateds));
          }else {
            return res.json(createOutput(true, "Failed to change permission"))
          }
        }else {
          return res.json(createOutput(true, " User doesn't exist"))
        }
      
      }else {
        return res.json(createOutput(true, "Pass Boolean Permission or Be monitor"))
      }
      
    } else {
      return res.json(createOutput(true, "No such user"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};




module.exports = {
  allUsers,
  login,
  deleteUser,
  updateUser,
  register,
  getUserById,
  changePermission
};


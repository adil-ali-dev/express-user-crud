const sequelize = require("../../../../database/index.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");

const findById = (id) => {
  try {
    return sequelize.models.users.findOne({
      where: {
        id: id,
        status: {
          [Op.not]: "pending",
        },
      },
      include: [
        {
          model: sequelize.models.roles,
          through: sequelize.models.userRoles,
        },
      ],
    });
  } catch (error) {
    console.log(`Error in findById of user service where id: ${id}`);
    throw error;
  }
};

const verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = res.locals.user;
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      delete res.locals.user.password;
      next();
    } else {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        error: "Either email or password is wrong",
      });
    }
  } catch (error) {
    console.error(
      `Error in verifyPassword of user service where email: ${req.body.email}`
    );
    res.send({
      status: "error",
      statusCode: 500,
      error: "Internal Server Error",
    });
  }
};

const findByEmailForLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await sequelize.models.users.findOne({
      where: { email },
      include: [
        {
          model: sequelize.models.roles,
          through: sequelize.models.userRoles,
        },
      ],
    });
    if (user) {
      if (user.status === "pending") {
        return res.status(403).json({
          status: "error",
          statusCode: 403,
          error: "User status is pending, please contact system administrator.",
        });
      } else if (user.status === "deleted") {
        return res.status(404).json({
          status: "error",
          statusCode: 404,
          error: "User is deleted, please contact system administrator",
        });
      }
      res.locals.user = user.dataValues;
      next();
    } else {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        error: "Either email or password is wrong",
      });
    }
  } catch (error) {
    console.error(
      `Error in findByEmailForLogin of user service where email: ${req.body.email}`
    );
    res.send({
      status: "error",
      statusCode: 500,
      error: "Internal Server Error",
    });
  }
};

const getUsers = (req, res) => {
  try {
    return sequelize.models.users.findAll({
      where: { status: { [Op.ne]: "deleted" } },
      include: [
        {
          model: sequelize.models.roles,
          through: sequelize.models.userRoles,
        },
      ],
    });
  } catch (error) {
    console.error(`Error in getUsers of user service`, error);
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
    return;
  }
};

const createUser = async (user, body, res) => {
  try {
    // find existing user
    const existingUser = await sequelize.models.users.findOne({
      where: {
        [Op.or]: [{ email: body.email }, { phoneNo: body.phoneNo }],
        status: {
          [Op.not]: "deleted",
        },
      },
    });
    if (existingUser) {
      res.status(409).json({ statusCode: 409, message: "User already exist" });
      return;
    }
    const newUser = await sequelize.models.users.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNo: body.phoneNo,
      address: body.address,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      password: body.password,
    });
    return newUser;
  } catch (error) {
    console.error(
      `Error in createUser of user service while creating user with email: ${body.email}`,
      error
    );
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
    return;
  }
};

const deleteUser = async (req, res) => {
  try {
    return await sequelize.models.users.update(
      { status: "deleted" },
      { where: { id: req.query.id } }
    );
  } catch (error) {
    console.error(
      `Error in deleteUser of user service where id is ${req.query.id}`,
      error
    );
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
    return;
  }
};
const editUser = async (req, res) => {
  try {
    console.log(req.body);
    return await sequelize.models.users.update(req.body, {
      where: { id: req.query.id },
    });
  } catch (error) {
    console.error(
      `Error in eidtUser of user service where id is ${req.query.id}`,
      error
    );
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
    return;
  }
};
module.exports = {
  findById,
  findByEmailForLogin,
  verifyPassword,
  createUser,
  getUsers,
  deleteUser,
  editUser,
};

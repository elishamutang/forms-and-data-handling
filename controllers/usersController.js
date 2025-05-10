const usersStorage = require("../storages/usersStorage");
const { body, query, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be formatted properly";
const ageErr = "must be between 18 and 120";
const bioErr = "must not exceed 200 characters";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`)
    .toLowerCase(),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`)
    .toLowerCase(),
  body("email").trim().isEmail().withMessage(`Email ${emailErr}`),
  body("age").optional({ values: "falsy" }).trim().isInt({ min: 18, max: 120 }).withMessage(`Age ${ageErr}`),
  body("bio").optional().trim().isLength({ max: 200 }).withMessage(`Bio ${bioErr}`),
];

// Assignment
const validateUserQuery = [
  query("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`)
    .toLowerCase(),
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

// Assignment
exports.usersSearchGet = [
  validateUserQuery,
  (req, res) => {
    const users = usersStorage.getUsers();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        title: "Search user",
        errors: errors.array(),
      });
    }

    const firstName = req.query.firstName;
    const userMatches = users.filter((user) => user.firstName === firstName);

    if (userMatches.length === 0) {
      return res.status(404).render("searchUser", {
        title: "Search user",
        errors: [{ msg: "Sorry, user not found :/" }],
      });
    }

    res.render("searchUser", {
      title: "Search user",
      users: userMatches,
    });
  },
];

const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decodedToken;
    next();
  } catch (error) {
    error.message = "Not authenticated";
    error.statusCode = 401;
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.token.role !== "admin") {
    let error = new Error("Not authorized");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};

const isTeacher = (req, res, next) => {
  if (req.token.role !== "teacher") {
    let error = new Error("Not authorized");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};

const isChild = (req, res, next) => {
  if (req.token.role !== "child") {
    let error = new Error("Not authorized");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};

const isAdminAndTeacher = (req, res, next) => {
  if (req.token.role !== "admin" && req.token.role !== "teacher") {
    let error = new Error("Not authorized");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isTeacher,
  isChild,
  isAdminAndTeacher
};




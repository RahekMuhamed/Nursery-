const jwt = require("jsonwebtoken");
const Child = require("../models/childSchema");
const Teacher = require("../models/teacherSchema");

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    // Check if the user is a child
    Child.findOne({ fullName: username, password: password })
        .then((child) => {
            if (child) {
                const token = generateToken(child._id, child.fullName, "child");
                res.status(200).json({ token, data: child });
                return;
            }

            // If not a child, check if the user is a teacher
            Teacher.findOne({ fullname: username, password: password })
                .then((teacher) => {
                    if (teacher) {
                        const token = generateToken(teacher._id, teacher.fullname, "teacher");
                        res.status(200).json({ token, data: teacher });
                        return;
                    }

                    // If neither child nor teacher, return error
                    const error = new Error("Username or password is incorrect");
                    error.statusCode = 401;
                    throw error;
                })
                .catch(next);
        })
        .catch(next);

    function generateToken(id, name, role) {
        return jwt.sign(
            { id, name, role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    }
};

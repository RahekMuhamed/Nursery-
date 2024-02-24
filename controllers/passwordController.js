const Teacher = require('../models/teacherSchema');
const Child = require('../models/childSchema');
const bcrypt = require('bcrypt');

// Change password endpoint for teachers
exports.changeTeacherPassword = async (req, res, next) => {
    try {
        const { id, newPassword } = req.body;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update teacher's password in the database
        await Teacher.findByIdAndUpdate(id, { password: hashedPassword });

        res.status(200).json({ message: 'Password changed successfully for teacher' });
    } catch (error) {
        next(error);
    }
};

// Change password endpoint for children
exports.changeChildPassword = async (req, res, next) => {
    try {
        const { id, newPassword } = req.body;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update child's password in the database
        await Child.findByIdAndUpdate(id, { password: hashedPassword });

        res.status(200).json({ message: 'Password changed successfully for child' });
    } catch (error) {
        next(error);
    }
};

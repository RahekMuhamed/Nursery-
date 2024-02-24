const Teacher =require("../models/teacherSchema")

exports.getAllTeachers = (req, res,next) => {
    // Placeholder function to retrieve all teachers
    // console.log(req.query); // get url query string
    // console.log(req.params); // get url query params
    Teacher.find({})
    .then((data) => {
        res.status(200).json(data);
        })
        .catch(error =>next(error));
    };


   

exports.insertTeacher = async (req, res, next) => {
    try {
        const { fullname, password, email } = req.body;
        const image = req.file ? req.file.filename : null; // Get uploaded image filename

        const teacher = new Teacher({
            objectID,
            fullname,
            password,
            email,
            image // Store image filename in the database
        });

        const savedTeacher = await teacher.save();
        res.status(201).json({ message: "Teacher added successfully", data: savedTeacher });
    } catch (error) {
        next(error);
    }
};


exports.getTeacherById = (req, res,next) => {
    Teacher.findById({ _id: req.params.id })
    .then((Teacher) => {
        // we have to check if the Teacher exists
        if (!Teacher) throw new Error("Id does not exist"); // this will be caught by catch block
        res.status(200).json(Teacher);
    })
    .catch(error => {
        next(error); // Pass the error to the error handling middleware
    });
};


exports.updateTeacher = (req, res, next) => {
    // Placeholder function to update a teacher
    const { fullname, email } = req.body;
    const updateData = { fullname, email };
    if (req.file) {
        updateData.image = req.file.filename; // Update image filename if uploaded
    }
    Teacher.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .then((updatedTeacher) => {
            if (!updatedTeacher) {
                throw new Error("Teacher not found");
            }
            res.status(200).json({ message: "Teacher updated successfully", data: updatedTeacher });
        })
        .catch(error => {
            next(error); // Pass the error to the error handling middleware
        });
};
exports.deleteTeacher = (req, res, next) => {
    Teacher.findByIdAndDelete(req.params.id)
        .then((deletedTeacher) => {
            if (!deletedTeacher) {
                throw new Error("Teacher not found");
            }
            res.status(200).json({ message: "Teacher deleted successfully" });
        })
        .catch(error => {
            next(error); // Pass the error to the error handling middleware
        });
};

exports.getAllSupervisors = (req, res) => {
    // Placeholder function to retrieve all supervisors
    res.status(200).json({ data: [{}, {}, {}] });
};






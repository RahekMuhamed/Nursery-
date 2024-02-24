const Child = require("../models/childSchema");

exports.getAllChildren = (req, res, next) => {
    Child.find({})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(error => next(error));
};

exports.insertChild = (req, res, next) => {
    // Create object from childSchema
    const childData = req.body;
    if (req.file) {
        childData.image = req.file.filename;
    }
    const object = new Child(childData);
    object.save()
        .then((data) => {
            res.status(201).json({ message: "Child added successfully", data });
        })
        .catch(error => {
            next(error); // Pass the error to the error handling middleware
        });
};

exports.getChildById = (req, res, next) => {
    Child.findById({ _id: req.params.id })
        .then((child) => {
            // Check if the child exists
            if (!child) {
                throw new Error("Id does not exist");
            }
            res.status(200).json(child);
        })
        .catch(error => {
            next(error); // Pass the error to the error handling middleware
        });
};

exports.updateChild = (req, res, next) => {
    // Placeholder function to update a child
    const childData = req.body;
    if (req.file) {
        childData.image = req.file.filename;
    }
    Child.findByIdAndUpdate(req.params.id, childData, { new: true })
        .then((updatedChild) => {
            if (!updatedChild) {
                throw new Error("Child not found");
            }
            res.status(200).json({ message: "Child updated successfully", data: updatedChild });
        })
        .catch(error => {
            next(error); // Pass the error to the error handling middleware
        });
};

exports.deleteChild = (req, res, next) => {
    Child.findByIdAndDelete(req.params.id)
        .then((deletedChild) => {
            if (!deletedChild) {
                throw new Error("Child not found");
            }
            res.status(200).json({ message: "Child deleted successfully" });
        })
        .catch(error => {
            next(error); // Pass the error to the error handling middleware
        });
};




















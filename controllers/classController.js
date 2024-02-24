const Class=require("../models/classSchema")


exports.getAllClasses = (req, res,next) => {
    // Placeholder function to retrieve all classes
     // console.log(req.query); // get url query string
    // console.log(req.params); // get url query params
    Class.find({})
    .populate({path:"supervisor",select:{name:1}})
    .populate({path:"children"})
    .then((data) => {
        res.status(200).json(data);
        })
        .catch(error =>next(error));

};

exports.insertClass = (req, res,next) => {
    // Placeholder function to add a new class
    // console.log(req.query); // get url query string
    // console.log(req.params); // get url query params
    // console.log(req.body); // post body

    //create object fron ClassSchema
    const object =new Class(req.body);
    object.save()
    .then((data) => {
        res.status(201).json({ message: "added",data });
   })
    
        .catch(error => {
            next(error); // Pass the error to the error handling middleware
        });
};

exports.getClassById = (req, res,next) => {
    Class.findById({ _id: req.params.id })
    .then((Class) => {
        // we have to check if the Class exists
        if (!Class) throw new Error("Id does not exist"); // this will be caught by catch block
        res.status(200).json(Class);
    })
    .catch(error => {
        next(error); // Pass the error to the error handling middleware
    });
};

exports.updateClass = (req, res) => {
    // Placeholder function to update a class
    res.status(200).json({ data: "update" });
};

exports.deleteClass = (req, res) => {
    // Placeholder function to delete a class
    res.status(200).json({ data: "delete" });
};

exports.getClassChildren = (req, res) => {
    // Placeholder function to retrieve children in a class
    res.status(200).json({ data: [{}, {}, {}] });
};

exports.getClassSupervisor = (req, res) => {
    // Placeholder function to retrieve supervisor of a class
    res.status(200).json({ data: {} });
};



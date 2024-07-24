import express from 'express';
import ProjectModel from "../models/createProjectModel.js";


const router = express.Router();

router.get('/fetchProjects', async (req, res) => {
    

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

   
    const searchData = req.query.filter ? {
        $or: [
            { ProjectName: { $regex: req.query.filter, $options: "i" } },
            { Reason: { $regex: req.query.filter, $options: "i" } },
            { Type: { $regex: req.query.filter, $options: "i" } },
            { Division: { $regex: req.query.filter, $options: "i" } },
            { Category: { $regex: req.query.filter, $options: "i" } },
            { Priority: { $regex: req.query.filter, $options: "i" } },
            { Department: { $regex: req.query.filter, $options: "i" } },
            { Location: { $regex: req.query.filter, $options: "i" } },
            { Status: { $regex: req.query.filter, $options: "i" } },
        ],
    }
        : {};

   

    //for sorting
    let sort = req.query.sort || "createdAt";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1];
    }
    else {
        sortBy[sort[0]] = "asc"
    }
    const totalCount = await ProjectModel.countDocuments();
    const projects = await ProjectModel.find({})
        .find(searchData).sort(sortBy).skip((page - 1) * limit).limit(limit);
   

    try {
        res.status(200).send({
            projects,
            totalCount
        });

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }

});
export default router;
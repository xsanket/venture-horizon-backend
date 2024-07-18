import express from 'express';
import ProjectModel from "../models/createProjectModel.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.put("/updateStatussss", authMiddleware, async (req, res) => {
    const { Status, id } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    //searching logic same as previous
    const searchData = req.query.filter ?
        {
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
        :
        {};


    // same sorting logic 
    let sort = req.query.sort || "ProjectName";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};

    if (sort[1]) {
        sortBy[sort[0]] = sort[1];
    }
    else {
        sortBy[sort[0]] = "desc"
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            id,
            { Status },
            { new: true }
        );

        const updateStatus = await ProjectModel.find({})
            .find(searchData)
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(limit)

        if (!updateStatus) {
            res.status(404).send({ message: "Project Not Found" });
        }
        else {
            
            res.send({
                success: true,
                message: "Status Updated",
                data: updateStatus
            });
            
            //res.status(200).send({ message: "Status Updated", updateStatus });
        }




    } catch (error) {
        res.status(500).send({ message: error.message });
    }


});

export default router;
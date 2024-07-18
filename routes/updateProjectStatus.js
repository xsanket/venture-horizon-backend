import express from 'express';
import ProjectModel from "../models/createProjectModel.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.put("/updateProjectStatus", async (req, res) => {
    const { Status, id } = req.body;
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(
            id,
            { Status },
            { new: true }
        )
        if (updatedProject) {
            res.send({
                success: true,
                message: "Status Updated",
                data: updatedProject
            });
        }
        else {
            return res.status(404).send({
                success: false,
                message: "Project Not Found"
            });
        }

    } catch (error) {
        res.send({
            success: false,
            message: "Internal server error",
        });
    }



});

export default router;
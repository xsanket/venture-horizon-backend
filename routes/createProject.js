import express from "express";
import createProjectModel from "../models/createProjectModel.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/createProject", authMiddleware, async (req, res) => {

    try {
        //object destructured
        const { ProjectName, Reason, Type, Division, Category, Priority, Department, StartDate, EndDate, Location, Status } = req.body;
      
        //check the date
        const startDateObj = new Date(StartDate);
        const endDateObj = new Date(EndDate);

        if (startDateObj > endDateObj) {
            return res.status(400).json({ message: "Start date cannot be greater than end date" });
            
        }

        const nameProject = await createProjectModel.findOne({ ProjectName });
        if (nameProject) {
            return res.send({
                success: false,
                message: "project name is already present"
            })
        }

        // create the project instance
        const project = new createProjectModel({ ProjectName, Reason, Type, Division, Category, Priority, Department, StartDate, EndDate, Location, Status });


        // save the project
        const saveProject = await project.save();
        res.status(201).send({
            success: true,
            message: "Project created successfully",
            data: saveProject
        })


    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error"
        });

    }

});

export default router;
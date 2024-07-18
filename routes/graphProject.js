import express from 'express';
import ProjectModel from "../models/createProjectModel.js";
import authMiddleware from '../middleware/authMiddleware.js';



const router = express.Router();

router.get("/getGraphData", authMiddleware, async (req, res) => {
    const strategy = await ProjectModel.countDocuments({
        Department: { $eq: "Strategy" },
        Status: { $eq: "Closed" },
    });
    const finance = await ProjectModel.countDocuments({
        Department: { $eq: "Finance" },
        Status: { $eq: "Closed" },
    });
    const quality = await ProjectModel.countDocuments({
        Department: { $eq: "Quality" },
        Status: { $eq: "Closed" },
    });

    const maintenance = await ProjectModel.countDocuments({
        Department: { $eq: "Maintenance" },
        Status: { $eq: "Closed" },
    });
    const stores = await ProjectModel.countDocuments({
        Department: { $eq: "Stores" },
        Status: { $eq: "Closed" },
    });
    const HR = await ProjectModel.countDocuments({
        Department: { $eq: "HR" },
        Status: { $eq: "Closed" },
    });

    const totalStrategy = await ProjectModel.countDocuments({
        Department: { $eq: "Strategy" },
    });
    const totalFinance = await ProjectModel.countDocuments({
        Department: { $eq: "Finance" },
    });
    const totalQuality = await ProjectModel.countDocuments({
        Department: { $eq: "Quality" },
    });

    const totalMaintenance = await ProjectModel.countDocuments({
        Department: { $eq: "Maintenance" },
    });
    const totalStores = await ProjectModel.countDocuments({
        Department: { $eq: "Stores" },
    });
    const totalHR = await ProjectModel.countDocuments({
        Department: { $eq: "HR" },
    });

    const closed = [strategy, finance, quality, maintenance, stores, HR];

    const total = [
        totalStrategy,
        totalFinance,
        totalQuality,
        totalMaintenance,
        totalStores,
        totalHR,
    ];

    try {
        res.status(200).send({ closed, total });
    } catch (err) {
        console.log(err);
        res.send({ msg: "No data found" });
    }
});



router.get("/countProject", async (req, res) => {
    const currentDate = new Date();
    

    const totalProjects = await ProjectModel.countDocuments();

    const closedProject = await ProjectModel.countDocuments({
        Status: { $eq: "Closed" },
    });

    const runningProject = await ProjectModel.countDocuments({
        Status: { $eq: "Running" },
    });

    const cancelledProject = await ProjectModel.countDocuments({
        Status: { $eq: "Cancelled" },
    });

    const delayProject = await ProjectModel.countDocuments({
        EndDate: { $lt: currentDate },
    });

    const count = [
        totalProjects,
        closedProject,
        runningProject,
        delayProject,
        cancelledProject,
    ];

    const head = [
        "Total Projects",
        "Closed",
        "Running",
        "Closure Delay",
        "Cancelled",
    ];

    const countObj = count.map((ele, index) => {
        return {
            count: ele,
            head: head[index],
        };
    });

    try {
        res.status(200).send(countObj);
    } catch (error) {
        console.log(err);
        res.status(400).send({ msg: "No Data Found" });
    }
})

export default router;
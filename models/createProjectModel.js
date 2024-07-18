import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    ProjectName: {
        type: String,
        required: true
    },
    Reason: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Division: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Priority: {
        type: String,
        required: true

    },
    Department: {
        type: String,
        required: true

    },
    StartDate: {
        type: Date,
        required: true

    },
    EndDate: {
        type: Date,
        required: true

    },
    Location: {
        type: String,
        required: true

    },
    Status: {
        type: String,
        default: "Registered"

    },

},
    {
        timestamps: true,
    }
);

const createProjectModel = mongoose.model("project", projectSchema);
export default createProjectModel;
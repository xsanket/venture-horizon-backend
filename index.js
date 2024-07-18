import express from 'express';
import dotenv from 'dotenv';
import dbConfig from './config/dbConfig.js';
import userLogin from './routes/userLogin.js';
import userRegister from './routes/userRegistration.js';
import createProject from './routes/createProject.js';
import cors from "cors";
import fetchProjects from './routes/fetchProject.js';
import updateStatus from './routes/updateStatus.js';
import updateProjectStatus from './routes/updateProjectStatus.js';
import graphProject from './routes/graphProject.js';



//express configuration
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());





//Routs
app.use('/api', userLogin)
app.use('/api', userRegister)
app.use('/api', createProject)
app.use('/api', fetchProjects)
app.use('/api', updateStatus)
app.use('/api', updateProjectStatus)
app.use('/api', graphProject)








//mongo DB connection
dbConfig.dbConnection();

app.listen(port, () => {
    console.log(`Server running on port ${port}`
    );
});



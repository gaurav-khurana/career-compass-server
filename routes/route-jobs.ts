import { Router } from "express";
import * as jobsController from "../controllers/jobsController";

const router = Router();

// route to get all job postings
router.get("/dashboard", jobsController.getAllJobs);

// route to get individual job posting by id
router.get("/dashboard/:id", jobsController.getSingleJob);

// route to post new job posting
router.post("/dashboard", jobsController.postJob);

// route to edit existing job posting
router.put("/dashboard/:id", jobsController.editJob);

// module.exports = router;
export default router;

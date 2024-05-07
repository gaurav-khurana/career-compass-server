import { Router } from "express";
import postJobDto from "../dtos/post-job";
import * as jobsController from "../controllers/jobsController";

const router = Router();

// router.get("/", (req, res) => res.send("Express with TS server working")); to chk router works

// router.get("/dashboard", (req, res) => res.send("All jobs ")); simple test way
router.get("/dashboard", jobsController.getAllJobs);

// router.get("/dashboard/:id", (req, res) => res.send("Individual job details ")); simple test way
router.get("/dashboard/:id", jobsController.getSingleJob);
router.put("/dashboard/:id", jobsController.editJob);

// router.post("/dashboard", (req, res) => {
//   const {
//     company_name,
//     job_position,
//     date,
//     status,
//     role,
//     duties,
//     requirements,
//   } = req.body as postJobDto;
//   res.status(201).json({ message: `New Job posted to dashboard` });
// });
router.post("/dashboard", jobsController.postJob);

// module.exports = router;
export default router;

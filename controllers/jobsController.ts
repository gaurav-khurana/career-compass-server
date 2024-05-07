import fs from "fs";
import { Request, Response } from "express";
import allJobsData from "../data/allJobs.json";
import postJobDto from "../dtos/post-job";

const path =
  "/Users/GauravKhurana/Documents/Brainstation projects/TypeScript/careercompass-server-ts/data/allJobs.json";

// function to read all jobs from alljobs.json file
function readAllJobs() {
  const allJobs = fs.readFileSync(path, "utf-8");
  const allJobsParsed = JSON.parse(allJobs);
  return allJobsParsed;
}

// function to get single job details by id
function readSingleJob(id: number) {
  const singleJob = allJobsData.find((job) => id == job.id);
  console.log(singleJob);
  return singleJob;
}

// controller to get all jobs on dashboard
export function getAllJobs(req: Request, res: Response) {
  try {
    res.status(200).json(readAllJobs());
  } catch (error) {
    res.status(400).json({ message: "Unable to get all jobs ", error });
  }
}

// controller to get individual job by id on details page
export function getSingleJob(req: Request, res: Response) {
  try {
    const jobId: number = Number(req.params.id);
    const allJobsData = readAllJobs();
    res.status(200).json(readSingleJob(jobId));
  } catch (error) {
    res.status(400).json({ message: "Unable to get Job Details ", error });
  }
}

// function to post new job
export function postJob(req: Request, res: Response) {
  try {
    const {
      id = allJobsData.length + 1,
      company_name,
      job_position,
      date,
      status,
      role,
      duties,
      requirements,
    } = req.body as postJobDto;

    const newJob = {
      id: id,
      company_name: company_name,
      job_position: job_position,
      date: date,
      status: status,
      role: role,
      duties: duties,
      requirements: requirements,
    };

    allJobsData.push(newJob);
    console.log(allJobsData);
    fs.writeFileSync(path, JSON.stringify(allJobsData));
    res.status(201).json({ message: `New Job posted to dashboard` });
  } catch (error) {
    res.status(400).json({ message: "FAILED to post new Job details" });
  }
}

// function to edit job posting
export function editJob(req: Request, res: Response) {
  try {
    const {
      id,
      company_name,
      job_position,
      date,
      status,
      role,
      duties,
      requirements,
    } = req.body as postJobDto;

    const newJob = {
      id: Number(req.params.id),
      company_name: company_name,
      job_position: job_position,
      date: date,
      status: status,
      role: role,
      duties: duties,
      requirements: requirements,
    };

    const allJobsData = readAllJobs();

    const jobId: number = Number(req.params.id);
    console.log(jobId);

    const filterJobById: postJobDto = allJobsData.find(
      (job: postJobDto, index: number) => job.id === jobId
    );
    console.log(filterJobById);

    const index = allJobsData.indexOf(filterJobById);
    console.log(index);

    allJobsData[index] = newJob;
    console.log(allJobsData);

    fs.writeFileSync(path, JSON.stringify(allJobsData));
    res.status(201).json({ message: `Edited Job posting Successful` });
  } catch (error) {
    res.status(400).json({ message: "FAILED to post new Job details" });
  }
}

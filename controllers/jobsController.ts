import fs from "fs";
import { Request, Response } from "express";
import allJobsData from "../data/allJobs.json";
import postJobDto from "../dtos/post-job";

// const allJobsDetails = [
//   {
//     id: 1,
//     company_name: "EA Sports",
//     job_position: "Software Engineer",
//     date: "12/4/24",
//     status: "Applied",
//     role: "In your role as a Software Engineer, you will work with a team to build APIs and web applications to support teams within EAX. You will collaborate across departments ( Design, Engineering, QA, Project Management ) and other internal customers to align and implement. You will also be a regular consumer of data to analyze performance of our live service products and collaborate with our senior engineers to identify live service opportunities to create richer player experiences. You will report to the Engineering Manager as a core contributor to the EAX team based in EA Vancouver.",
//     duties:
//       "Build testable modular components/features and debug live issues. Collaborate with other developers to promote the culture of performance, maintainability, quality and automation in the team. Collaborate across departments ( Design, Engineering, QA, Project Management ) and other internal customers to align and implement. Learn new technologies and apply new techniques to improve existing solutions",
//     requirements:
//       "2+ years of experience in a technical role focused on development and operation of complex live services. Strong Javascript and Typescript experience. Familiarity with backend web technologies. Familiarity with databases. Experience with GraphQL, NodeJS, and Kubernetes is a plus. ",
//   },
//   {
//     id: 2,
//     company_name: "Konrad",
//     job_position: "Jr. Frontend web developer",
//     date: "16/4/24",
//     status: "Applied",
//     role: "As an entry level Software Developer you'll be tasked with working on both mobile and web applications. Working within the software development team, your duties will require you to assist in the development of consumer and enterprise applications. This role is ideal for entry level developers who feel confident in their technical ability and want to be a part of the highly-skilled development team at Konrad.",
//     duties:
//       "Write maintainable, testable, and performant software in collaboration with our world class team. Participate in code review and performing extensive testing to ensure high quality software.Research new technology and tools and share those findings with the team.Communicate clearly and effectively with all members of our team",
//     requirements:
//       "Graduated from a Computer Science, Software Engineering, or similar program in a University or College. Strong command of important programming and computer science concepts. Ability to understand a web application and how it's built from end-to-end. Fundamental knowledge of core web principals (HTTP, the DOM, SSL, web servers. Fluency with databases (schema design, querying, optimization etc.). Great interpersonal skills - we work very closely together as a team and require a lot of communication. Proactive personality and a desire to deliver your best work.",
//   },
// ];
const path =
  "/Users/GauravKhurana/Documents/Brainstation projects/TypeScript/careercompass-server-ts/data/allJobs.json";
// const path = "../data/allJobs.json";

// function to read all jobs from alljobs.json file
function readAllJobs() {
  const allJobs = fs.readFileSync(path, "utf-8");
  const allJobsParsed = JSON.parse(allJobs);
  // const allJobsParsed: postJobDto[] = JSON.parse(allJobs);
  // console.log(allJobsParsed);
  return allJobsParsed;

  // return allJobsDetails;
}

// function to get single job details by id
function readSingleJob(id: number) {
  // const jobId;
  const singleJob = allJobsData.find((job) => id == job.id);
  console.log(singleJob);
  return singleJob;
}

// controller to get all jobs on dashboard
// async function getAllJobs(req: Request, res: Response) {
export function getAllJobs(req: Request, res: Response) {
  try {
    // res.send("Got all jobs from server"); simple test way
    // res.status(200).json({ message: "All Jobs from Server " }); chck server gives response & json back
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
    // const singleJob = allJobsDetails.find((job) => job.id === jobId);
    // const singleJob = allJobsData.find(
    //   (job: { id: number }) => job.id === jobId
    // );
    // res.status(200).json(singleJob);
    res.status(200).json(readSingleJob(jobId));

    // res.status(200).json({ message: "Individual Job Details from Server" }); chck server gives response & json back
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

    // allJobsDetails.push(newJob);
    // console.log(allJobsDetails);
    allJobsData.push(newJob);
    console.log(allJobsData);
    // fs.writeFileSync("../data/allJobs.json", JSON.stringify(allJobsDetails));
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
    // console.log(allJobsData);
    const jobId: number = Number(req.params.id);
    console.log(jobId);
    // const getSingleJobData = readSingleJob(jobId);
    // console.log(getSingleJobData);

    const filterJobById: postJobDto = allJobsData.find(
      (job: postJobDto, index: number) => job.id === jobId
    );
    console.log(filterJobById);
    const index = allJobsData.indexOf(filterJobById);
    console.log(index);
    allJobsData[index] = newJob;
    console.log(allJobsData);

    // allJobsData.push(newJob);
    // fs.writeFileSync("../data/allJobs.json", JSON.stringify(allJobsData));
    fs.writeFileSync(path, JSON.stringify(allJobsData));
    res.status(201).json({ message: `Edited Job posting Successful` });
  } catch (error) {
    res.status(400).json({ message: "FAILED to post new Job details" });
  }
}

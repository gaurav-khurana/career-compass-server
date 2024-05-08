import express, { NextFunction, Request, Response } from "express";
import jobsRouter from "./routes/route-jobs";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import usersData from "./data/users.json";
import cors from "cors";
import { userDetailsDto } from "./dtos/post-job";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();
// const cors = require("cors");

// const PORT: number = 8080;
const { PORT, JWT_SECRET_KEY } = process.env;
console.log(JWT_SECRET_KEY);
const SECRET_KEY: Secret = JWT_SECRET_KEY || "careercompasssecretkey";
// middleware for cors
app.use(cors());

// middleware for json
app.use(express.json());

// middleware to authenticate token
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token: string =
    req.headers.authorization?.split(" ")[1] || "Missing token";
  console.log(token);

  if (!token) {
    res.status(401).json({ message: "No token provided. Auth Failed" });
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(498).json({ message: "Token validation Failed" });
    }
    // req.body = decoded;
    next();
  });
}

// Login route
app.post("/login", (req: Request, res: Response) => {
  const foundUser: userDetailsDto | undefined = usersData.find((user) => {
    return (
      user.username.toLowerCase() === req.body.username.toLowerCase() &&
      user.password === req.body.password
    );
  });

  console.log(foundUser);

  if (!foundUser) {
    res.status(401).json({ message: "Authentication Failed. No user found" });
    return;
  }

  // generate JWT token
  const token: string | JwtPayload = jwt.sign(
    { userId: foundUser.id, username: foundUser.username },
    SECRET_KEY,
    { expiresIn: "2h" }
  );

  res
    .status(200)
    // .json({ message: `Login Succesful. ${foundUser.username}`, token });
    .json({ token });
});

// base home route & redirection with router
app.use("/", authenticateToken, jobsRouter);

// to chk if server running
// app.get("/", (req: Request, res: Response) =>
//   res.send("Express server with TS Running")
// );

app.listen(PORT, () => {
  console.log("Listening to server on ", PORT);
});

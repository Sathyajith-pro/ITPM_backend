import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import peopleRoute from "./routes/peopleRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import StockRoute from "./routes/StockRoute.js";
import supplier from "./routes/route1.js"; // default export

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // middleware to parse JSON

// JWT Middleware
app.use((req, res, next) => {
    let token = req.header("Authorization");

    if (token != null) {
        token = token.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) {
                req.user = decoded;
            }
        });
    }
    next();
});

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});

// Routes
app.use("/supplier", supplier);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/peoples", peopleRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/stock", StockRoute);

// Start server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

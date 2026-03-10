import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import connectDB from "./lib/db.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "frontend", "dist");
    app.use(express.static(distPath));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

export default app;
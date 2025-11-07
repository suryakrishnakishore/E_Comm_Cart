import cors from "cors";
import express from "express";
import env from "dotenv";
import routes from "./routes/index.js";
import BodyParser from "body-parser";
import connectDB from "./libs/database.js";

env.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(BodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
app.use((req, res) => {
    res.status(404).json({
        status: "Not Found",
        message: "Route Not Found",
    })
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})
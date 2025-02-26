//external imports
import express from "express";
import "dotenv/config";
//internal imports
import { dbConnect } from "./utils/db";
import userRoutes from "./routes/userRoutes";

//app setup
const app = express();
app.use(express.json());
dbConnect();
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log("Port listening on the port 5555");
});
//server checking
app.get("/alive", (req, res) => {
  res.send("Server is alive");
});
//user routes
app.use("/api/v1/user", userRoutes);

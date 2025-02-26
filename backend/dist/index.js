"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//external imports
const express_1 = __importDefault(require("express"));
require("dotenv/config");
//internal imports
const db_1 = require("./utils/db");
//app setup
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.dbConnect)();
app.listen(5555, () => {
    console.log("Port listening on the port 5555");
});
app.get("/alive", (req, res) => {
    res.send("Server is alive");
});

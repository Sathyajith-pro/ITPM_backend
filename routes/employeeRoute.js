import express from "express";
import { createemployee,getAllemployee,deleteEmployee,getOneEmployee,updateemployee } from "../controllers/employeeController.js";

const route = express.Router();
//set employee routes

route.post("/createemp", createemployee);
//get all emp
route.get("/getallemp", getAllemployee);

route.get("/getoneemployee/:id", getOneEmployee);
route.put("/updateemployee/:id", updateemployee);
route.delete("/deleteemp/:id", deleteEmployee);
export default route;
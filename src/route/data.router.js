import { Router } from "express";
import getNextDataPoint from "../controller/dataset.controller.js"

const router = Router();

router.route("/get-data-points").post(getNextDataPoint);

export default router ;


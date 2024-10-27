import { Router } from "express";
import {
    addTruck,
    deleteTruck,
    startTruckJourney,
    listOwnerTrucks,
    endTruckJourney,
    getActiveJourneys
} from "../controller/truck.controller.js"
import {upload} from "../middleware/multer.middleware.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()
router.route("/add-truck").post( verifyJWT ,
    upload.fields([
        {
            name: "driverPhoto",
            maxCount:1,
        }
    ])  , addTruck
)

router.route("/delete-truck").post(verifyJWT , deleteTruck);
router.route("/start-truck-journey").post(verifyJWT , startTruckJourney);
router.route("/list-owner-trucks").post(verifyJWT , listOwnerTrucks);
router.route("/end-truck-journey").post(verifyJWT , endTruckJourney);
router.route("/get-active-journeys").post(verifyJWT , getActiveJourneys);



export default router
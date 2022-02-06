import express from "express";
import {
  prices,
  createsubscription,
  getsubscriptionstatus,
} from "../controllers/subs";

const router = express.Router();

router.get("/prices", prices);
router.post("/createsubscription", createsubscription);
router.post("/getsubscriptionstatus", getsubscriptionstatus);

module.exports = router;

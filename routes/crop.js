const express = require("express");
const router = express.Router();
// const { PrismaClient } = require("prisma/prisma-client");
// const prisma = new PrismaClient();
const cropController = require("../controllers/cropController");

router
  .route("/")
  .get(cropController.getAllCrops)
  .post(cropController.addCrop)
  .patch(cropController.updateCrop)
  .delete(cropController.deleteCrop);

router.route("/viewCrops").get(cropController.returnViewCrops);

router.route("/:name").get(cropController.getCrop);

module.exports = router;

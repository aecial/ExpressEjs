const express = require("express");
const router = express.Router();
const { PrismaClient } = require("prisma/prisma-client");
const prisma = new PrismaClient();
const cropController = require("../controllers/cropController");
router.get("/", async (req, res) => {
  const crops = await prisma.crops.findMany();
  res.render("users", { crops });
});
router
  .route("/test")
  .get(cropController.getAllCrops)
  .delete(cropController.deleteCrop)
  .patch(cropController.updateCrop);
router.get("/getCrops", async (req, res) => {
  const crops = await prisma.crops.findMany();
  res.json(crops);
});

router
  .route("/addCrop")
  .get((req, res) => {
    res.render("newCrop");
  })
  .post(cropController.addCrop);

router.route("/:name").get(cropController.getCrop);
module.exports = router;

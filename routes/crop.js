const express = require("express");
const router = express.Router();
const { PrismaClient } = require("prisma/prisma-client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const crops = await prisma.crops.findMany();
  res.render("users", { crops });
});
router.get("/getCrops", async (req, res) => {
  const crops = await prisma.crops.findMany();
  res.json(crops);
});
router.get("/:name", async (req, res) => {
  const reqName = req.params.name;
  const reqNameEdited = reqName.charAt(0).toUpperCase() + reqName.slice(1);

  const findCrop = await prisma.crops.findUnique({
    where: {
      name: reqNameEdited,
    },
  });
  if (findCrop === null) {
    res.json({ message: "No Crop Found" });
  } else {
    res.json(findCrop);
  }
});
router.post("/addCrop", async (req, res) => {
  const { name, price } = req.body;
  try {
    const newCrop = await prisma.crops.create({
      data: {
        name: name,
        price: price,
      },
    });
    res.status(201);
    res.send({ message: `Added new crop ${name}` });
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;

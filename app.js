const express = require("express");
const app = express();
const port = 3000;
const { PrismaClient } = require("prisma/prisma-client");
const prisma = new PrismaClient();

const availableCrops = require("./model/crops.json");
app.listen(port, console.log(`Server is listening on port ${port}...`));
app.set("view engine", "ejs");
app.use(express.json());
//routes
app.get("/", (req, res) => {
  res.render("index", { availableCrops });
});
app.get("/jokes", (req, res) => {
  res.render("jokes", { jokes: [1, 2, 3, 4, 5] });
});
app.get("/users", async (req, res) => {
  const crops = await prisma.crops.findMany();
  res.render("users", { crops });
});
app.get("/getCrops", async (req, res) => {
  const crops = await prisma.crops.findMany();
  res.json(crops);
});
app.post("/addCrop", async (req, res) => {
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
// app.post("/newCrops", async (req, res) => {
//   const newCrop = await prisma.crops.create({
//     data: {
//       name: "Talong ",
//       price: 60,
//     },
//   });

//   res.sendStatus(201);
// });

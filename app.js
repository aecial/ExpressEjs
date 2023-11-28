const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const { PrismaClient } = require("prisma/prisma-client");
const prisma = new PrismaClient();

const availableCrops = require("./model/crops.json");
app.listen(port, console.log(`Server is listening on port ${port}...`));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
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
app.get("/addCrop", async (req, res) => {
  res.render("newCrop");
});

const cropRouter = require("./routes/crop");
app.use("/crop", cropRouter);

// 404 Page
app.get("*", (req, res) => {
  res.render("404");
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

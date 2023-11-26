const prisma = require("../components/PrismaProvider");
const getAllCrops = async (req, res) => {
  const crops = await prisma.crops.findMany();
  res.json(crops);
};
const addCrop = async (req, res) => {
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
};
const getCrop = async (req, res) => {
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
};
const deleteCrop = async (req, res) => {
  const { id } = req.body;
  const theCrop = await prisma.crops.findUnique({
    where: {
      id: id,
    },
  });
  try {
    const delCrop = await prisma.crops.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: `DELETED ${theCrop.name}` });
  } catch (error) {
    res.send(error);
  }
};
const updateCrop = async (req, res) => {
  const { id, price } = req.body;
  const theCrop = await prisma.crops.findUnique({
    where: {
      id: id,
    },
  });
  try {
    const upd = await prisma.crops.update({
      where: {
        id,
      },
      data: {
        price: price,
      },
    });
    res.json({
      message: `Updated Price of ${theCrop.name} to ${price} from ${theCrop.price}`,
    });
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  getAllCrops,
  addCrop,
  getCrop,
  deleteCrop,
  updateCrop,
};
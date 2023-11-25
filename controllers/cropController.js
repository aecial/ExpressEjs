const prisma = require("../components/PrismaProvider");
const getAllCrops = async (req, res) => {
  const crops = await prisma.crops.findMany();
  res.json(crops);
};
module.exports = getAllCrops;

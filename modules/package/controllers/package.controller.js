const db = require("../../../config/database.config");
const Package = db.model.package;
const PackageFeature = db.model.packageFeature;
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = async (req, res) => {
  const packageData = req.body;
  //   res.json(packageData);
  try {
    const newPackage = await Package.create({
      name: packageData.packageName,
      price: packageData.price,
    });
    const packId = newPackage?.id;
    const featuresArray = packageData?.features;
    if (featuresArray.length > 0) {
      for (const feature of featuresArray) {
        await PackageFeature.create({
          package_id: packId,
          name: feature.name,
          value: feature.value,
        });
      }
    }
    successResponse(200, "OK", newPackage, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Creating Package",
      res
    );
  }
};

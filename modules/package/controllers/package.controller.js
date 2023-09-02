const { where } = require("sequelize");
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
      res,
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const packages = await Package.findAll({
      include: [
        {
          model: PackageFeature,
        },
      ],
      order: [["id", "DESC"]],
    });
    if (packages) {
      successResponse(200, "OK", packages, res);
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Creating Package",
      res,
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Package.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        PackageFeature.destroy({
          where: {
            package_id: id,
          },
        })
          .then((num) => {
            res.send({
              message: "Package was deleted successfully!",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Package with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot delete Package with id=${id}. Maybe Package was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Package with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const packageData = req.body;

  try {
    const findPackage = await Package.findByPk(id);
    if (findPackage) {
      const updatedPackage = await Package.update(
        {
          name: packageData.packageName,
          price: packageData.price,
        },
        {
          where: {
            id: id,
          },
        },
      );
      if (updatedPackage) {
        const deletedNum = await PackageFeature.destroy({
          where: {
            package_id: id,
          },
        });
        if (packageData.features.length > 0) {
          const featuresArray = packageData.features;
          for (let feature of featuresArray) {
            await PackageFeature.create({
              package_id: id,
              name: feature.name,
              value: feature.value,
            });
          }
          successResponse(200, "OK", updatedPackage, res);
        } else {
          successResponse(200, "OK", updatedPackage, res);
        }
      }
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Creating Package",
      res,
    );
  }
};

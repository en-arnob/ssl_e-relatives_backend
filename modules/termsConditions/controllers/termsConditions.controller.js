const db = require("../../../config/database.config");
const TermsConditions = db.model.termConditions;
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.saveData = async (req, res) => {
  const data = req.body;

  const roleId = data.role_id;

  const isFound = await TermsConditions.findOne({
    where: {
      role_id: roleId,
    },
  });

  if (isFound) {
    TermsConditions.destroy({
      where: {
        role_id: roleId,
      },
    })
      .then((r) => {
        TermsConditions.create(data)
          .then((r) => {
            return res.json({ msg: "Updated Successfully" });
          })
          .catch((err) => {
            return res.json(err);
          });
      })
      .catch((err) => {
        return res.json(err);
      });
  } else {
    TermsConditions.create(data)
      .then((r) => {
        return res.json({ msg: "Saved Successfully" });
      })
      .catch((err) => {
        return res.json(err);
      });
  }
};

exports.getData = (req, res) => {
  const roleId = req.params.id;
  TermsConditions.findOne({
    where: {
      role_id: roleId,
    },
  })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.json({
        msg: "Cannot Get Terms and Conditions for given role_id",
      });
    });
};

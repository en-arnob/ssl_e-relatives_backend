const db = require("../../../config/database.config");
const SystemSetting = db.model.systemSetting;
const Op = db.DataTypes.Op;
const AppError = require("../../../utils/appError");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");
path = require("path");

// update system settings by default row id 1
exports.update = (req, res) => {
  // return res.json({msg: "route working"})
  SystemSetting.findAndCountAll().then((result) => {
    if (result.count == 0) {
      console.log(req.body);
      SystemSetting.create(req.body)
        .then((data) => {
          console.log(data.toJSON());

          return successResponse(201, "OK", data, res);
        })
        .catch((err) => {
          return errorResponse(
            500,
            "ERROR",
            err.message || "Failed to Register, Please try Again!",
            res
          );
        });
    } else {
      SystemSetting.update(req.body, {
        where: { id: 1 },
      })
        .then((num) => {
          if (num == 1) {
            successResponse(200, "OK", num, res);
            // res.send({
            //     message: "Settings updated successfully"
            // })
          } else {
            res.send({
              message: "failed",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error",
          });
        });
    }
  });
};

exports.getData = (req, res) => {
  SystemSetting.findAll()
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while fetching the data",
        res
      );
    });
  // return res.send({msg: "Route Active"})
};

// exports.uploadLogo = (req, res) => {
//     // return res.send({"msg": "Route OK"})
//     let image = req.file.path
//     let name = req.body.logoName
//     let data = {}
//     SystemSetting.findAll().then(data => {
//         data = data
//     }).catch(err => {
//         console.log(err)
//     });
//     data.logo_image = image
//     SystemSetting.update(data, {
//         where: { id: 1}
//     })
//     .then(num => {
//         console.log(num)
//     })
//     .catch(err => {
//         console.log(err)
//     })

//     return res.json({msg: "uploaded"})
// }

exports.upload = (req, res) => {
  const files = req.files;

  if (Array.isArray(files) && files.length > 0) {
    let logoUrl = files[0].filename;
    let favUrl = files[1].filename;
    let data = {};
    // console.log(favUrl);
    SystemSetting.findAll()
      .then((data) => {
        data = data;
      })
      .catch((err) => {
        console.log(err);
      });
    data.logo_image = logoUrl;
    data.fav_image = favUrl;
    SystemSetting.update(data, {
      where: { id: 1 },
    })
      .then((num) => {
        console.log(num);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.json({ msg: "Error" });
  }
};

module.exports = (sequelize, DataTypes) => {
  const BloodReq = sequelize.define("blood_request", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    req_blood_group: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    req_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    collection_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reached_donor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return BloodReq;
};

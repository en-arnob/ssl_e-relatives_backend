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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collection_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accepted_donor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    investigation_ids: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return BloodReq;
};

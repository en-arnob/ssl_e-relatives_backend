module.exports = (sequelize, DataTypes) => {
  const TestReq = sequelize.define("test_request", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    req_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    select_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inv_image: {
      type: DataTypes.TEXT,
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

  return TestReq;
};

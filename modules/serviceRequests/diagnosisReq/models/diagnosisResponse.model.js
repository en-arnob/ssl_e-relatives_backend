module.exports = (sequelize, DataTypes) => {
  const TestDiagnoResponse = sequelize.define("test_diagno_response", {
    req_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_center_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    investigation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return TestDiagnoResponse;
};

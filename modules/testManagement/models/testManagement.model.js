module.exports = (sequelize, DataTypes) => {
  const InvestigationTest = sequelize.define(
    "investigation_tests",
    {
      investigation_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      uom_id: {
        type: DataTypes.INTEGER,
      },
      reference: {
        type: DataTypes.STRING,
      },
      info: {
        type: DataTypes.TEXT,
      },
      order_no: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      tableName: "investigation_tests",
    }
  );

  return InvestigationTest;
};

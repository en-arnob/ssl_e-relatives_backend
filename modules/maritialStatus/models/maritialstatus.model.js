module.exports = (sequelize, DataTypes) => {
  const MaritalStatus = sequelize.define(
    "marital_status",
    {
      name: {
        type: DataTypes.STRING,
      },
      info: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      tableName: "marital_status",
    }
  );

  return MaritalStatus;
};

module.exports = (sequelize, DataTypes) => {
  const UOM = sequelize.define(
    "rooms",
    {
      name: {
        type: DataTypes.STRING,
      },
      floor: {
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
      tableName: "rooms",
    }
  );

  return UOM;
};

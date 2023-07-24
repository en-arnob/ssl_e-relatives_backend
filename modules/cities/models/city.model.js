module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "cities",
    {
      name: {
        type: DataTypes.STRING,
      },
      state_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
      }
    },
    {
      freezeTableName: true,
      tableName: "cities",
    }
  );

  return City;
};


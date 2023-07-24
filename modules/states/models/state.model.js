module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define(
    "states",
    {
      name: {
        type: DataTypes.STRING,
      },
      country_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      tableName: "states",
    }
  );

  return State;
};


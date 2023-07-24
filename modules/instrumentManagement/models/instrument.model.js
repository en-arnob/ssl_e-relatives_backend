module.exports = (sequelize, DataTypes) => {
  const Instrument = sequelize.define(
    "instruments",
    {
      name: {
        type: DataTypes.STRING,
      },
      unit_id: {
        type: DataTypes.INTEGER,
      },
      cat_id: {
        type: DataTypes.INTEGER,
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
      tableName: "instruments",
    }
  );

  return Instrument;
};

module.exports = (sequelize, DataTypes) => {
  const InstrumentsCat = sequelize.define(
    "instrument_categories",
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
      tableName: "instrument_categories",
    }
  );

  return InstrumentsCat;
};

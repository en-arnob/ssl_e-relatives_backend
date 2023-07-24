module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "countries",
    {
      name: {
        type: DataTypes.STRING,
      },
      nationality: {
        type: DataTypes.TEXT,
      },
      shortname: {
        type: DataTypes.STRING,
      },
      phonecode: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      tableName: "countries",
    }
  );

  return Country;
};

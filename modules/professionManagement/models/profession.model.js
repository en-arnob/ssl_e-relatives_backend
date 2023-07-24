module.exports = (sequelize, DataTypes) => {
  const Profession = sequelize.define(
    "professions",
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
      tableName: "professions",
    }
  );

  return Profession;
};

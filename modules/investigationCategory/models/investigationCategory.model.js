module.exports = (sequelize, DataTypes) => {
  const InvestigationCategory = sequelize.define(
    "investigation_categories",
    {
      name: {
        type: DataTypes.STRING,
      },
      investigation_group_id: {
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
      tableName: "investigation_categories",
    }
  );

  return InvestigationCategory;
};

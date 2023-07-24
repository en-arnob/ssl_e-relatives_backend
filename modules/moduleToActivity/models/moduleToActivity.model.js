module.exports = (sequelize, DataTypes) => {
  const ModuleToActivity = sequelize.define(
    "module_to_activity",
    {
      module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    },
    {
      timestamps: false,
    }
  );

  return ModuleToActivity;
};

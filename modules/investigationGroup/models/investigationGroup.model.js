module.exports = (sequelize, DataTypes) => {
  const InvestigationGroup = sequelize.define(
    'investigation_groups',
    {
      name: {
        type: DataTypes.STRING,
      },
      info: {
        type: DataTypes.TEXT,
      },
      link: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      tableName: 'investigation_groups',
    }
  );

  return InvestigationGroup;
};

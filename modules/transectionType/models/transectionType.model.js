module.exports = (sequelize, DataTypes) => {
  const TransectionType = sequelize.define(
    'transection_type',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '	0 = inactive, 1 = active	',
      },
      created_by: {
        type: DataTypes.INTEGER,
        comment: 'User ID',
      },
      updated_by: {
        type: DataTypes.INTEGER,
        comment: 'User ID',
      },
    },
    {
      freezeTableName: true,
    }
  );

  return TransectionType;
};

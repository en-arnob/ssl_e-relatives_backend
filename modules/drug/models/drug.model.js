module.exports = (sequelize, DataTypes) => {
  const Drug = sequelize.define('drugs', {
    drug_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
      comment: '1 = Active, 0 = Inactive',
    },
    created_by: {
      type: DataTypes.INTEGER,
      comment: 'User ID',
    },
    updated_by: {
      type: DataTypes.INTEGER,
      comment: 'User ID',
    },
  });

  return Drug;
};

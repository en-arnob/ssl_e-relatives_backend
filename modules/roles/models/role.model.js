module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    info: {
      type: DataTypes.TEXT,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '	0 = inactive, 1 = active	',
    },
    created_by: {
      type: DataTypes.INTEGER,
      comment: 'User ID'
    },
    updated_by: {
      type: DataTypes.INTEGER,
      comment: 'User ID'
    },
  });

  return Role;
};

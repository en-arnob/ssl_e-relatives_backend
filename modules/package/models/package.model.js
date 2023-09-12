module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define("package", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  });
  return Package;
};

module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define("package", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
    },
  });
  return Package;
};

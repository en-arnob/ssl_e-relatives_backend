module.exports = (sequelize, DataTypes) => {
  const PackageFeature = sequelize.define("package_feature", {
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  });
  return PackageFeature;
};

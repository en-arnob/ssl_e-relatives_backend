module.exports = (sequelize, DataTypes) => {
  const HealthMan = sequelize.define("healthman", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return HealthMan;
};

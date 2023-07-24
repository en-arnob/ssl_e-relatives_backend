module.exports = (sequelize, DataTypes) => {
  const TermsConditions = sequelize.define("terms_conditions", {
    role_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    info: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  });

  return TermsConditions;
};

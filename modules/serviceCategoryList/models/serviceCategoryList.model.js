module.exports = (sequelize, DataTypes) => {
  const ServiceCategoryList = sequelize.define(
    "service_category_lists",
    {
      name: {
        type: DataTypes.STRING,
      },
      info: {
        type: DataTypes.TEXT,
      },
      role_id: {
        type: DataTypes.INTEGER,
      },
      service_category_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return ServiceCategoryList;
};

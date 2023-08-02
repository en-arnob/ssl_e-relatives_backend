module.exports = (sequelize, DataTypes) => {
  const SystemSetting = sequelize.define("system_settings", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    website_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag_line: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fav_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vat_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    copyright: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "1= active, 0=inactive",
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "User ID",
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "User ID",
    },
  });

  return SystemSetting;
};

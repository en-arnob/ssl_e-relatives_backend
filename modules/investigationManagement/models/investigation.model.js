module.exports = (sequelize, DataTypes) => {
  const Investigation = sequelize.define(
    "investigations",
    {
      code: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      detailed_name: {
        type: DataTypes.STRING,
      },
      report_title: {
        type: DataTypes.STRING,
      },
      report_sub_title: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      discounted_price: {
        type: DataTypes.FLOAT,
      },
      vat_rate: {
        type: DataTypes.INTEGER,
      },
      commission_rate: {
        type: DataTypes.FLOAT,
      },
      preparation_duration: {
        type: DataTypes.INTEGER,
      },
      delivery_time: {
        type: DataTypes.STRING,
      },
      room_id: {
        type: DataTypes.STRING,
      },
      investigation_group_id: {
        type: DataTypes.INTEGER,
      },
      investigation_category_id: {
        type: DataTypes.INTEGER,
      },
      report_type: {
        type: DataTypes.INTEGER,
      },
      info: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      tableName: "investigations",
    }
  );

  return Investigation;
};

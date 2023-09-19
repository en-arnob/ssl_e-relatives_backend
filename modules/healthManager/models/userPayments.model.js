module.exports = (sequelize, DataTypes) => {
  const UserPayment = sequelize.define("user_payment", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tran_date: {
      type: DataTypes.DATE,
    },
    tran_id: {
      type: DataTypes.STRING,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    store_amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    currency: {
      type: DataTypes.STRING,
    },
    product_name: {
      type: DataTypes.STRING,
    },
    product_category: {
      type: DataTypes.STRING,
    },
    product_profile: {
      type: DataTypes.STRING,
    },
    card_type: {
      type: DataTypes.STRING,
    },
    card_brand: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  });
  return UserPayment;
};

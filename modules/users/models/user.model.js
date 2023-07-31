module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    role_id: {
      type: DataTypes.INTEGER,
    },
    service_category_id: {
      type: DataTypes.INTEGER,
    },
    registration_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    f_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    l_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    address_1: {
      type: DataTypes.TEXT,
    },
    address_2: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    finger_print: {
      type: DataTypes.TEXT,
    },
    user_otp: {
      type: DataTypes.INTEGER,
    },
    otp_verified: {
      type: DataTypes.INTEGER,
    },
    user_details_added: {
      type: DataTypes.INTEGER,
    },
    contact_person: {
      type: DataTypes.STRING,
    },
    passport_no: {
      type: DataTypes.STRING,
    },
    nid: {
      type: DataTypes.INTEGER,
    },
    credit_limit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    commission_rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    remarks: {
      type: DataTypes.TEXT,
    },
    wallet: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "1 = Active, 0 = Inactive",
    },
    created_by: {
      type: DataTypes.INTEGER,
      comment: "User ID",
      defaultValue: 0,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      comment: "User ID",
      defaultValue: 0,
    },
  });

  return User;
};

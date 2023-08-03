module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define("user_detail", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    father_name: {
      type: DataTypes.STRING,
    },

    mother_name: {
      type: DataTypes.STRING,
    },

    gender_id: {
      type: DataTypes.INTEGER,
    },

    marital_status_id: {
      type: DataTypes.INTEGER,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    state_id: {
      type: DataTypes.INTEGER,
    },
    city_id: {
      type: DataTypes.INTEGER,
    },
    blood_group: {
      type: DataTypes.INTEGER,
    },
    owner_name: {
      type: DataTypes.STRING,
    },
    institution_name: {
      type: DataTypes.STRING,
    },
    responsible_person_name: {
      type: DataTypes.STRING,
    },
    designation: {
      type: DataTypes.STRING,
    },
    vehicle_license: {
      type: DataTypes.STRING,
    },
    trade_license: {
      type: DataTypes.STRING,
    },
    bmdc_license: {
      type: DataTypes.STRING,
    },
    dghs_license: {
      type: DataTypes.STRING,
    },
    drug_license: {
      type: DataTypes.STRING,
    },
    online_service_time: {
      type: DataTypes.STRING,
    },
    available_service: {
      type: DataTypes.INTEGER,
    },
    delivery_person_name: {
      type: DataTypes.STRING,
    },
    driver_name: {
      type: DataTypes.STRING,
    },
    driving_license: {
      type: DataTypes.STRING,
    },
    last_blood_donate: {
      type: DataTypes.DATEONLY,
    },
    specialization_degree: {
      type: DataTypes.STRING,
    },
    driving_exp_years: {
      type: DataTypes.INTEGER,
    },
    nationality_id: {
      type: DataTypes.INTEGER,
    },
    profession_id: {
      type: DataTypes.INTEGER,
    },
    company_id: {
      type: DataTypes.INTEGER,
    },
    delegates_id: {
      type: DataTypes.INTEGER,
    },
    introducer_id: {
      type: DataTypes.INTEGER,
    },
    package_id: {
      type: DataTypes.INTEGER,
    },
    package_price: {
      type: DataTypes.INTEGER,
    },
    paid_amount: {
      type: DataTypes.INTEGER,
    },
    payment_method_id: {
      type: DataTypes.INTEGER,
    },
  });

  return UserDetails;
};

module.exports = (sequelize, DataTypes) => {

    const ServiceCategory = sequelize.define('service_categories', {
        name: {
            type: DataTypes.STRING
        },
        info: {
            type: DataTypes.TEXT
        },
        role_id: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
        created_by: {
            type: DataTypes.INTEGER,
        },
        updated_by: {
            type: DataTypes.INTEGER,
        }
      }
    );
  
  
    return ServiceCategory;
  
}
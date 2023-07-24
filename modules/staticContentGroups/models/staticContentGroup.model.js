module.exports = (sequelize, DataTypes) => {

    const StaticContentGroup = sequelize.define('static_content_groups', {
        name: {
          type: DataTypes.STRING
        },
        info: {
          type: DataTypes.TEXT
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
  
  
    return StaticContentGroup;
  
}
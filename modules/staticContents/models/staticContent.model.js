module.exports = (sequelize, DataTypes) => {

    const StaticContent = sequelize.define('static_contents', {
        name: {
            type: DataTypes.STRING
        },
        info: {
            type: DataTypes.TEXT
        },
        static_content_group_id: {
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
  
  
    return StaticContent;
  
}
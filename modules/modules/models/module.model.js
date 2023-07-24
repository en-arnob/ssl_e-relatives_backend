module.exports = (sequelize, DataTypes) => {

    const Module = sequelize.define('modules', {
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
  
  
    return Module;
  
}
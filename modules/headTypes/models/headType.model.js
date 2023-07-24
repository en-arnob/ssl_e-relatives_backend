module.exports = (sequelize, DataTypes) => {

    const HeadType = sequelize.define('head_type', {
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
      },
      {
        freezeTableName: true
      },
    );
  
  
    return HeadType;
  
}
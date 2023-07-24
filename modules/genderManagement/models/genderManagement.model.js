module.exports = (sequelize, DataTypes) => {

    const Gender = sequelize.define('genders', {
        name: {
            type: DataTypes.STRING
          },
          info: {
            type: DataTypes.TEXT
          },
          status: {
            type: DataTypes.INTEGER
          }
    }, {
        freezeTableName: true,
        tableName: 'genders'
    });
  
  
    return Gender;
  
}